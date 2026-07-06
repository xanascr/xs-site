import { Router } from "express";
import multer from "multer";
import semver from "semver";
import Package from "../../models/Package.js";
import { cacheMiddleware } from "../../middleware/cache.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = q ? { $text: { $search: q } } : {};
    const packages = await Package.find(filter)
      .select("name description version license author downloads updatedAt")
      .sort({ downloads: -1 })
      .limit(50)
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

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, version, description, license, author, repository, keywords, readme } = req.body;

    if (!name || !/^[a-z0-9_-]+$/.test(name)) {
      return res.status(400).json({ ok: false, error: "Invalid package name" });
    }
    if (version && !semver.valid(version)) {
      return res.status(400).json({ ok: false, error: "Invalid semver version" });
    }

    let fid = null;
    if (req.file) {
      fid = await req.app.locals.seaweedfs.upload(
        `${name}-${version || "1.0.0"}.tar.gz`,
        req.file.buffer
      );
    }

    const existing = await Package.findOne({ name });
    if (existing) {
      Object.assign(existing, { version: version || existing.version, description, license, author, repository, keywords, readme, fid: fid || existing.fid });
      await existing.save();
    } else {
      await Package.create({ name, version: version || "1.0.0", description, license, author, repository, keywords, readme, fid });
    }

    const redis = req.app.locals.redis;
    if (redis) await redis.del(`cache:/api/packages/${name}`);

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/:name/download", async (req, res) => {
  try {
    const pkg = await Package.findOneAndUpdate(
      { name: req.params.name },
      { $inc: { downloads: 1 } },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ ok: false, error: "not found" });

    if (pkg.fid) {
      const data = await req.app.locals.seaweedfs.download(pkg.fid);
      if (data) {
        res.set("Content-Type", "application/gzip");
        return res.send(data);
      }
    }

    res.json({ ok: true, downloads: pkg.downloads });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
