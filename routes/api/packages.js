import { Router } from "express";
import multer from "multer";
import semver from "semver";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import Package from "../../models/Package.js";
import { auth, optionalAuth } from "../../middleware/auth.js";
import { cacheMiddleware } from "../../middleware/cache.js";
import { sanitizeHtml } from "../../services/sanitize.js";
import pkg from "aws4";
const { sign } = pkg;

const router = Router();
const MAX_TARBALL_SIZE = 5 * 1024 * 1024; // 5MB source-only limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_TARBALL_SIZE },
});
const BATCH_MAX = 10;

function sanitizeSearch(q) {
  return (q || "").replace(/[(){}\[\]"'~*?\\-]/g, " ").trim().slice(0, 100);
}

function validateKeywords(kw) {
  if (!kw) return [];
  const parsed = typeof kw === "string" ? safeJsonParse(kw, []) : kw;
  if (!Array.isArray(parsed)) return [];
  return parsed.slice(0, 20).map(k => String(k).slice(0, 50));
}

function safeJsonParse(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v;
  } catch {
    return fallback;
  }
}

// ── List packages ──────────────────────────────────────────────────────────
router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    const q = sanitizeSearch(req.query.q);
    const filter = { status: "approved" };
    if (q) filter.$text = { $search: q };
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const [packages, total] = await Promise.all([
      Package.find(filter)
        .select("name description version license author downloads updatedAt keywords")
        .sort({ downloads: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Package.countDocuments(filter),
    ]);

    res.json({
      ok: true,
      packages,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── My packages ─────────────────────────────────────────────────────────────
router.get("/mine", auth, async (req, res) => {
  try {
    const packages = await Package.find({ authorId: req.user.id })
      .select("name description version status downloads updatedAt")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Get single package (with optional version) ─────────────────────────────
router.get("/:name", cacheMiddleware(60), async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" }).lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "not found" });

    const result = { ...pkg };
    const reqVersion = req.query.version;

    // If a specific version is requested, serve that version's metadata
    if (reqVersion && pkg.versions) {
      const ver = pkg.versions.find(v => v.version === reqVersion);
      if (!ver) return res.status(404).json({ ok: false, error: "version not found" });
      result.version = ver.version;
      result.description = ver.description || pkg.description;
      result.license = ver.license || pkg.license;
      result.repository = ver.repository || pkg.repository;
      result.keywords = ver.keywords?.length > 0 ? ver.keywords : pkg.keywords;
      result.readme = ver.readme || pkg.readme;
      result.readmeSanitized = ver.readmeSanitized || pkg.readmeSanitized;
      result.s3Key = ver.s3Key || pkg.s3Key;
      result.fileSize = ver.fileSize || pkg.fileSize;
      result.dependencies = ver.dependencies || pkg.dependencies;
    }

    // Attach versions list
    result.versionsList = (pkg.versions || []).map(v => v.version);

    delete result.versions;
    res.json({ ok: true, package: result });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Publish / Update package ────────────────────────────────────────────────
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { name, version, description, license, repository, keywords, readme, dependencies } = req.body;

    if (!name || !/^[a-z0-9_-]+$/.test(name)) {
      return res.status(400).json({ ok: false, error: "Invalid package name" });
    }
    if (!version || !semver.valid(version)) {
      return res.status(400).json({ ok: false, error: "Invalid semver version" });
    }

    let s3Key = null;
    let fileSize = 0;

    if (req.file) {
      fileSize = req.file.buffer.length;
      if (fileSize > MAX_TARBALL_SIZE) {
        return res.status(400).json({ ok: false, error: `Package tarball exceeds ${MAX_TARBALL_SIZE / 1024 / 1024}MB limit` });
      }
      s3Key = await uploadToSeaweedFS(req, `${name}-${version}.tar.gz`, req.file.buffer);
    }

    const parsedDeps = typeof dependencies === "string"
      ? safeJsonParse(dependencies, [])
      : Array.isArray(dependencies)
        ? dependencies
        : [];

    // Parse readme for sanitization
    const readmeSanitized = readme ? sanitizeHtml(readme) : "";

    const existing = await Package.findOne({ name });

    if (existing) {
      // Ownership check
      if (existing.authorId && existing.authorId.toString() !== req.user.id) {
        return res.status(403).json({ ok: false, error: "You do not own this package" });
      }

      // Check for duplicate version
      if (existing.versions && existing.versions.some(v => v.version === version)) {
        return res.status(409).json({ ok: false, error: `Version ${version} already exists` });
      }

      // Build version entry
      const versionEntry = {
        version,
        description: description ?? existing.description,
        license: license ?? existing.license,
        repository: repository ?? existing.repository,
        keywords: validateKeywords(keywords).length > 0 ? validateKeywords(keywords) : existing.keywords,
        readme: readme ?? existing.readme,
        readmeSanitized: readme ? readmeSanitized : existing.readmeSanitized,
        s3Key: s3Key || existing.s3Key,
        fileSize: fileSize || existing.fileSize,
        dependencies: parsedDeps.length > 0 ? parsedDeps : existing.dependencies,
      };

      // Add version to array (handle old packages without versions field)
      if (!existing.versions) existing.versions = [];
      existing.versions.push(versionEntry);
      existing.versions.sort((a, b) => semver.rcompare(a.version, b.version));

      // Update latest snapshot
      existing.version = version;
      existing.description = versionEntry.description;
      existing.license = versionEntry.license;
      existing.repository = versionEntry.repository;
      existing.keywords = versionEntry.keywords;
      existing.readme = versionEntry.readme;
      existing.readmeSanitized = versionEntry.readmeSanitized;
      existing.s3Key = versionEntry.s3Key;
      existing.fileSize = versionEntry.fileSize;
      existing.dependencies = versionEntry.dependencies;
      existing.authorId = existing.authorId || req.user.id;
      existing.status = "pending";
      existing.reviewNotes = "";
      existing.reviewedBy = null;
      existing.reviewedAt = null;

      await existing.save();
    } else {
      // New package
      const versionEntry = {
        version,
        description: description || "",
        license: license || "MIT",
        repository: repository || "",
        keywords: validateKeywords(keywords),
        readme: readme || "",
        readmeSanitized: readme ? readmeSanitized : "",
        s3Key,
        fileSize,
        dependencies: parsedDeps,
      };

      await Package.create({
        name,
        version,
        description: versionEntry.description,
        license: versionEntry.license,
        author: req.user.username,
        repository: versionEntry.repository,
        keywords: versionEntry.keywords,
        readme: versionEntry.readme,
        readmeSanitized: versionEntry.readmeSanitized,
        s3Key,
        fileSize,
        dependencies: parsedDeps,
        authorId: req.user.id,
        status: "pending",
        versions: [versionEntry],
      });
    }

    // Invalidate cache
    const redis = req.app.locals.redis;
    if (redis) {
      await redis.del(`cache:/api/packages`);
      await redis.del(`cache:/api/packages/${name}`);
    }

    res.json({
      ok: true,
      version,
      message: `Version ${version} submitted for review. An admin will review it shortly.`,
    });
  } catch (e) {
    console.error("Publish error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Batch package upload ──────────────────────────────────────────────────
router.post("/batch", auth, async (req, res) => {
  try {
    const { packages } = req.body;
    if (!Array.isArray(packages) || packages.length === 0) {
      return res.status(400).json({ ok: false, error: "packages array required" });
    }
    if (packages.length > BATCH_MAX) {
      return res.status(400).json({ ok: false, error: `Maximum ${BATCH_MAX} packages per batch` });
    }

    const results = [];

    for (const pkg of packages) {
      const { name, version, description, license, repository, keywords, dependencies } = pkg;
      const errors = [];

      if (!name || !/^[a-z0-9_-]+$/.test(name)) errors.push("Invalid package name");
      if (!version || !semver.valid(version)) errors.push("Invalid semver version");

      if (errors.length > 0) {
        results.push({ name, ok: false, errors });
        continue;
      }

      try {
        const existing = await Package.findOne({ name });
        if (existing) {
          if (existing.authorId && existing.authorId.toString() !== req.user.id) {
            results.push({ name, ok: false, error: "You do not own this package" });
            continue;
          }
          if (existing.versions && existing.versions.some(v => v.version === version)) {
            results.push({ name, ok: false, error: `Version ${version} already exists` });
            continue;
          }

          const deps = Array.isArray(dependencies) ? dependencies.slice(0, 20) : [];
          const kws = Array.isArray(keywords) ? keywords.slice(0, 20).map(k => String(k).slice(0, 50)) : existing.keywords;

          const versionEntry = {
            version,
            description: description ?? existing.description,
            license: license ?? existing.license,
            repository: repository ?? existing.repository,
            keywords: kws,
            readme: existing.readme,
            readmeSanitized: existing.readmeSanitized,
            dependencies: deps.length > 0 ? deps : existing.dependencies,
          };

          if (!existing.versions) existing.versions = [];
          existing.versions.push(versionEntry);
          existing.versions.sort((a, b) => semver.rcompare(a.version, b.version));
          existing.version = version;
          existing.description = versionEntry.description;
          existing.license = versionEntry.license;
          existing.repository = versionEntry.repository;
          existing.keywords = kws;
          existing.dependencies = deps.length > 0 ? deps : existing.dependencies;
          existing.status = "pending";
          existing.reviewNotes = "";
          existing.reviewedBy = null;
          existing.reviewedAt = null;
          await existing.save();
        } else {
          const deps = Array.isArray(dependencies) ? dependencies : [];
          const kws = Array.isArray(keywords) ? keywords.slice(0, 20).map(k => String(k).slice(0, 50)) : [];

          await Package.create({
            name,
            version,
            description: description || "",
            license: license || "MIT",
            author: req.user.username,
            repository: repository || "",
            keywords: kws,
            authorId: req.user.id,
            dependencies: deps,
            status: "pending",
            versions: [{
              version,
              description: description || "",
              license: license || "MIT",
              repository: repository || "",
              keywords: kws,
              dependencies: deps,
            }],
          });
        }
        results.push({ name, ok: true });
      } catch (e) {
        results.push({ name, ok: false, error: "Internal server error" });
      }
    }

    const redis = req.app.locals.redis;
    if (redis) await redis.del("cache:/api/packages");

    const succeeded = results.filter(r => r.ok).length;
    res.json({
      ok: true,
      message: `${succeeded}/${packages.length} packages submitted for review`,
      results,
    });
  } catch (e) {
    console.error("Batch publish error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Source files ────────────────────────────────────────────────────────────
router.get("/:name/source", auth, async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("name s3Key version versions status authorId").lean();
    if (!pkg || !pkg.s3Key) return res.status(404).json({ ok: false, error: "Source not available" });
    if (pkg.status !== "approved" && pkg.authorId?.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Source not available for unreviewed packages" });
    }

    // Determine which s3Key to use
    let targetKey = pkg.s3Key;
    const reqVersion = req.query.version;
    if (reqVersion && pkg.versions) {
      const ver = pkg.versions.find(v => v.version === reqVersion);
      if (ver && ver.s3Key) targetKey = ver.s3Key;
    }

    const data = await downloadFromSeaweedFS(req, targetKey);
    if (!data) return res.status(404).json({ ok: false, error: "Source not available" });

    const os = await import("os");
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "xs-pkg-"));
    const realTmpDir = fs.realpathSync(tmpDir);
    try {
      const tgzPath = path.join(realTmpDir, "pkg.tar.gz");
      fs.writeFileSync(tgzPath, data);
      execFileSync("tar", ["-xzf", tgzPath, "-C", realTmpDir], { stdio: "pipe" });

      const files = [];
      function walk(dir) {
        for (const f of fs.readdirSync(dir)) {
          const full = path.join(dir, f);
          const realFull = fs.realpathSync(full);
          if (!realFull.startsWith(realTmpDir)) continue;
          if (fs.statSync(realFull).isDirectory()) {
            walk(realFull);
          } else {
            const rel = path.relative(realTmpDir, realFull);
            const content = fs.readFileSync(realFull, "utf-8");
            files.push({ path: rel, content });
          }
        }
      }
      walk(realTmpDir);

      res.json({ ok: true, files });
    } finally {
      fs.rmSync(realTmpDir, { recursive: true, force: true });
    }
  } catch (e) {
    console.error("Source error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Download tarball ────────────────────────────────────────────────────────
router.post("/:name/download", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" });
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found or not yet approved" });

    let targetVersion = pkg.version;
    let targetKey = pkg.s3Key;

    const reqVersion = req.query.version;
    if (reqVersion && pkg.versions) {
      const ver = pkg.versions.find(v => v.version === reqVersion);
      if (ver) {
        targetVersion = ver.version;
        if (ver.s3Key) targetKey = ver.s3Key;
      }
    }

    const key = targetKey || `${pkg.name}-${targetVersion}.tar.gz`;
    const data = await downloadFromSeaweedFS(req, key);
    if (!data) return res.status(404).json({ ok: false, error: "Source file not available" });

    await Package.updateOne({ _id: pkg._id }, { $inc: { downloads: 1 } });

    res.set("Content-Type", "application/gzip");
    res.set("Content-Disposition", `attachment; filename="${pkg.name}-${targetVersion}.tar.gz"`);
    res.send(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── SeaweedFS helpers ───────────────────────────────────────────────────────
async function s3Request(method, key, buffer) {
  const endpoint = process.env.SEAWEEDFS_VOLUME || "http://localhost:8080";
  const accessKey = process.env.SEAWEEDFS_USERNAME || "";
  const secretKey = process.env.SEAWEEDFS_PASSWORD || "";
  const bucket = process.env.SEAWEEDFS_BUCKET || "";
  if (!accessKey || !secretKey) throw new Error("SeaweedFS credentials not configured");

  const url = new URL(endpoint);
  const path = bucket ? `/${bucket}/${key}` : `/${key}`;

  const opts = {
    host: url.hostname,
    path,
    method,
    service: "s3",
    region: "us-east-1",
    headers: {},
  };
  if (url.port) opts.port = parseInt(url.port);

  if (buffer) {
    opts.headers["Content-Type"] = "application/gzip";
    opts.headers["Content-Length"] = buffer.length;
    opts.body = buffer;
  }

  const signed = sign(opts, { accessKeyId: accessKey, secretAccessKey: secretKey });
  const mod = url.protocol === "https:" ? await import("https") : await import("http");

  return await new Promise((resolve, reject) => {
    const httpreq = mod.request(signed, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode < 300) resolve(body);
        else reject(new Error(`S3 request failed: ${res.statusCode} ${body.toString().slice(0, 500)}`));
      });
    });
    httpreq.on("error", reject);
    if (buffer) httpreq.write(buffer);
    httpreq.end();
  });
}

async function uploadToSeaweedFS(req, filename, buffer) {
  try {
    await s3Request("PUT", filename, buffer);
    return filename;
  } catch (e) {
    console.warn("SeaweedFS upload failed:", e.message);
    return null;
  }
}

async function downloadFromSeaweedFS(req, key) {
  try {
    return await s3Request("GET", key);
  } catch (e) {
    console.warn("SeaweedFS download failed:", e.message);
    return null;
  }
}

export default router;
