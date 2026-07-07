import { Router } from "express";
import multer from "multer";
import semver from "semver";
import Package from "../../models/Package.js";
import { auth, optionalAuth } from "../../middleware/auth.js";
import { cacheMiddleware } from "../../middleware/cache.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const BATCH_MAX = 10;

router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = { status: "approved" };
    if (q) filter.$text = { $search: q };
    const packages = await Package.find(filter)
      .select("name description version license author downloads updatedAt keywords")
      .sort({ downloads: -1 })
      .limit(50)
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/mine", auth, async (req, res) => {
  try {
    const packages = await Package.find({ authorId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/:name", cacheMiddleware(60), async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "not found" });
    res.json({ ok: true, package: pkg });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
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
      s3Key = await uploadToSeaweedFS(req, `${name}-${version || "1.0.0"}.tar.gz`, req.file.buffer);
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
        keywords: keywords ? (typeof keywords === "string" ? JSON.parse(keywords) : keywords) : existing.keywords,
        readme: readme ?? existing.readme,
        s3Key: s3Key || existing.s3Key,
        fileSize: fileSize || existing.fileSize,
        authorId: existing.authorId || req.user.id,
        status: "pending",
        reviewNotes: "",
        reviewedBy: null,
        reviewedAt: null,
      });
      await existing.save();
    } else {
      const kw = keywords ? (typeof keywords === "string" ? JSON.parse(keywords) : keywords) : [];
      await Package.create({
        name,
        version: version || "1.0.0",
        description: description || "",
        license: license || "MIT",
        author: req.user.username,
        repository: repository || "",
        keywords: kw,
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
    res.status(500).json({ ok: false, error: e.message });
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
            keywords: Array.isArray(keywords) ? keywords : existing.keywords,
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
            keywords: Array.isArray(keywords) ? keywords : [],
            authorId: req.user.id,
            status: "pending",
          });
        }
        results.push({ name, ok: true });
      } catch (e) {
        results.push({ name, ok: false, error: e.message });
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
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/:name/download", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" });
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found or not yet approved" });

    await Package.updateOne({ _id: pkg._id }, { $inc: { downloads: 1 } });

    if (pkg.s3Key) {
      const data = await downloadFromSeaweedFS(req, pkg.s3Key);
      if (data) {
        res.set("Content-Type", "application/gzip");
        res.set("Content-Disposition", `attachment; filename="${pkg.name}-${pkg.version}.tar.gz"`);
        return res.send(data);
      }
    }

    res.json({
      ok: true,
      name: pkg.name,
      version: pkg.version,
      downloads: pkg.downloads + 1,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

async function uploadToSeaweedFS(req, filename, buffer) {
  try {
    const https = await import("https");
    const { hostname, port } = new URL(process.env.SEAWEEDFS_VOLUME || "http://localhost:8080");
    const auth = Buffer.from(
      `${process.env.SEAWEEDFS_USERNAME || ""}:${process.env.SEAWEEDFS_PASSWORD || ""}`
    ).toString("base64");

    return new Promise((resolve, reject) => {
      const options = {
        hostname,
        port: port || 8080,
        path: `/${filename}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/gzip",
          "Content-Length": buffer.length,
          Authorization: `Basic ${auth}`,
        },
        rejectUnauthorized: false,
      };
      const httpreq = https.request(options, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (res.statusCode < 300) resolve(filename);
          else reject(new Error(`SeaweedFS upload failed: ${res.statusCode} ${body}`));
        });
      });
      httpreq.on("error", reject);
      httpreq.write(buffer);
      httpreq.end();
    });
  } catch (e) {
    console.warn("SeaweedFS upload failed:", e.message);
    return null;
  }
}

async function downloadFromSeaweedFS(req, key) {
  try {
    const https = await import("https");
    const { hostname, port } = new URL(process.env.SEAWEEDFS_VOLUME || "http://localhost:8080");
    const auth = Buffer.from(
      `${process.env.SEAWEEDFS_USERNAME || ""}:${process.env.SEAWEEDFS_PASSWORD || ""}`
    ).toString("base64");

    return new Promise((resolve, reject) => {
      const options = {
        hostname,
        port: port || 8080,
        path: `/${key}`,
        method: "GET",
        headers: { Authorization: `Basic ${auth}` },
        rejectUnauthorized: false,
      };
      const httpreq = https.request(options, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (res.statusCode < 300) resolve(Buffer.concat(chunks));
          else reject(new Error(`SeaweedFS download failed: ${res.statusCode}`));
        });
      });
      httpreq.on("error", reject);
      httpreq.end();
    });
  } catch (e) {
    console.warn("SeaweedFS download failed:", e.message);
    return null;
  }
}

export default router;
