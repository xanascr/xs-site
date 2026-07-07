import { Router } from "express";
import multer from "multer";
import semver from "semver";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import Package from "../../models/Package.js";
import { auth, optionalAuth } from "../../middleware/auth.js";
import { cacheMiddleware } from "../../middleware/cache.js";
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

router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    const q = sanitizeSearch(req.query.q);
    const filter = { status: "approved" };
    if (q) filter.$text = { $search: q };
    const packages = await Package.find(filter)
      .select("name description version license author downloads updatedAt keywords")
      .sort({ downloads: -1 })
      .limit(50)
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/mine", auth, async (req, res) => {
  try {
    const packages = await Package.find({ authorId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/:name", cacheMiddleware(60), async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" }).lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "not found" });
    res.json({ ok: true, package: pkg });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { name, version, description, license, repository, keywords, readme } = req.body;

    if (!name || !/^[a-z0-9_-]+$/.test(name)) {
      return res.status(400).json({ ok: false, error: "Invalid package name" });
    }
    if (version && !semver.valid(version)) {
      return res.status(400).json({ ok: false, error: "Invalid semver version" });
    }

    let s3Key = null;
    let fileSize = 0;

    if (req.file) {
      fileSize = req.file.buffer.length;
      if (fileSize > MAX_TARBALL_SIZE) {
        return res.status(400).json({ ok: false, error: `Package tarball exceeds ${MAX_TARBALL_SIZE / 1024 / 1024}MB limit` });
      }
      const safeVersion = semver.valid(version) || "1.0.0";
      s3Key = await uploadToSeaweedFS(req, `${name}-${safeVersion}.tar.gz`, req.file.buffer);
    }

    const existing = await Package.findOne({ name });
    if (existing) {
      if (existing.authorId && existing.authorId.toString() !== req.user.id) {
        return res.status(403).json({ ok: false, error: "You do not own this package" });
      }
      Object.assign(existing, {
        version: version || existing.version,
        description: description ?? existing.description,
        license: license ?? existing.license,
        repository: repository ?? existing.repository,
        keywords: validateKeywords(keywords).length > 0 ? validateKeywords(keywords) : existing.keywords,
        readme: readme ?? existing.readme,
        s3Key: s3Key || existing.s3Key,
        fileSize: fileSize || existing.fileSize,
        authorId: existing.authorId || req.user.id,
      });
      await existing.save();
    } else {
      await Package.create({
        name,
        version: version || "1.0.0",
        description: description || "",
        license: license || "MIT",
        author: req.user.username,
        repository: repository || "",
        keywords: validateKeywords(keywords),
        readme: readme || "",
        s3Key,
        fileSize,
        authorId: req.user.id,
        status: "pending",
      });
    }

    const redis = req.app.locals.redis;
    if (redis) {
      await redis.del(`cache:/api/packages`);
      await redis.del(`cache:/api/packages/${name}`);
    }

    res.json({
      ok: true,
      message: "Package submitted for review. An admin will review it shortly.",
    });
  } catch (e) {
    console.error("Publish error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Batch package upload ──────────────────────────────────────────────
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
      const { name, version, description, license, repository, keywords } = pkg;
      const errors = [];

      if (!name || !/^[a-z0-9_-]+$/.test(name)) errors.push("Invalid package name");
      if (version && !semver.valid(version)) errors.push("Invalid semver version");

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
          Object.assign(existing, {
            version: version || existing.version,
            description: description ?? existing.description,
            license: license ?? existing.license,
            repository: repository ?? existing.repository,
            keywords: Array.isArray(keywords) ? keywords.slice(0, 20).map(k => String(k).slice(0, 50)) : existing.keywords,
            authorId: existing.authorId || req.user.id,
            status: "pending",
            reviewNotes: "",
            reviewedBy: null,
            reviewedAt: null,
          });
          await existing.save();
        } else {
          await Package.create({
            name,
            version: version || "1.0.0",
            description: description || "",
            license: license || "MIT",
            author: req.user.username,
            repository: repository || "",
            keywords: Array.isArray(keywords) ? keywords.slice(0, 20).map(k => String(k).slice(0, 50)) : [],
            authorId: req.user.id,
            status: "pending",
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

router.get("/:name/source", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("name s3Key status").lean();
    if (!pkg || !pkg.s3Key) return res.status(404).json({ ok: false, error: "Source not available" });

    const data = await downloadFromSeaweedFS(req, pkg.s3Key);
    if (!data) return res.status(404).json({ ok: false, error: "Source not available" });

    const os = await import("os");
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "xs-pkg-"));
    try {
      const tgzPath = path.join(tmpDir, "pkg.tar.gz");
      fs.writeFileSync(tgzPath, data);
      execSync(`tar -xzf "${tgzPath}" -C "${tmpDir}"`, { stdio: "pipe" });

      const files = [];
      function walk(dir) {
        for (const f of fs.readdirSync(dir)) {
          const full = path.join(dir, f);
          if (fs.statSync(full).isDirectory()) {
            walk(full);
          } else {
            const rel = path.relative(tmpDir, full);
            const content = fs.readFileSync(full, "utf-8");
            files.push({ path: rel, content });
          }
        }
      }
      walk(tmpDir);

      res.json({ ok: true, files });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  } catch (e) {
    console.error("Source error:", e);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/:name/download", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" });
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found or not yet approved" });

    await Package.updateOne({ _id: pkg._id }, { $inc: { downloads: 1 } });

    const key = pkg.s3Key || `${pkg.name}-${pkg.version}.tar.gz`;
    const data = await downloadFromSeaweedFS(req, key);
    if (data) {
      res.set("Content-Type", "application/gzip");
      res.set("Content-Disposition", `attachment; filename="${pkg.name}-${pkg.version}.tar.gz"`);
      return res.send(data);
    }

    res.json({
      ok: true,
      name: pkg.name,
      version: pkg.version,
      downloads: pkg.downloads + 1,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

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
