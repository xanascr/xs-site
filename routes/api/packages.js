import { Router } from "express";
import { auth, optionalAuth, asyncHandler } from "../../middleware/auth.js";
import multer from "multer";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import tar from "tar";
import { randomBytes } from "crypto";
import { fileURLToPath } from "url";
import Package from "../../models/Package.js";
import Review from "../../models/Review.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads", "packages");
const EXTRACT_DIR = path.join(UPLOADS_DIR, "extracted");

const MAX_TARBALL_SIZE = 5 * 1024 * 1024;
const ALLOWED_NAME = /^[a-z0-9][a-z0-9_-]{0,62}$/;
const ALLOWED_VERSION = /^\d+\.\d+\.\d+(-[a-z0-9.]+)?$/i;

fs.mkdirSync(UPLOADS_DIR, { recursive: true });
fs.mkdirSync(EXTRACT_DIR, { recursive: true });

function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9._-]/gi, "_").slice(0, 100);
}

function stripHtml(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "");
}

function isPathInside(child, parent) {
  const resolved = path.resolve(child);
  const parentResolved = path.resolve(parent);
  return resolved.startsWith(parentResolved + path.sep) || resolved === parentResolved;
}

const publishLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { ok: false, error: "Muitas requisições. Aguarde um minuto." },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const name = sanitizeFilename(req.body.name || "pkg");
    const version = sanitizeFilename(req.body.version || "1.0.0");
    cb(null, `${name}-${version}.tar.gz`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["application/gzip", "application/x-gzip", "application/x-tar"];
  if (allowedMimes.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Formato inválido. Apenas .tar.gz"));
};

const upload = multer({ storage, limits: { fileSize: MAX_TARBALL_SIZE }, fileFilter });

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
  const filter = { status: "approved" };
  if (req.query.q) {
    filter.$text = { $search: req.query.q };
  }
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 50));
  const skip = (page - 1) * limit;

  const [packages, total] = await Promise.all([
    Package.find(filter)
      .select("name description version license author downloads keywords updatedAt")
      .populate("author", "username")
      .sort({ downloads: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Package.countDocuments(filter),
  ]);

  res.json({ ok: true, packages, total, page, pages: Math.ceil(total / limit) });
}));

router.get("/mine", auth, asyncHandler(async (req, res) => {
  const packages = await Package.find({ author: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  res.json({ ok: true, packages });
}));

router.get("/:name", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name }).populate("author", "username").lean();
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });

  if (pkg.status !== "approved" && (!req.user || (String(pkg.author) !== req.user.id && req.user.role !== "admin"))) {
    return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  }

  let result = pkg;
  if (req.query.version) {
    const ver = pkg.versions.find(v => v.version === req.query.version);
    if (ver) {
      result = { ...pkg, ...ver, version: ver.version };
    }
  }

  res.json({ ok: true, package: result });
}));

router.post("/", auth, publishLimiter, (req, res, next) => {
  upload.single("tarball")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ ok: false, error: `Upload: ${err.message}` });
    }
    if (err) {
      return res.status(400).json({ ok: false, error: err.message });
    }
    next();
  });
}, asyncHandler(async (req, res) => {
  const { name, version, description, license, repository, keywords, readme, dependencies } = req.body;

  if (!name || !ALLOWED_NAME.test(name)) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ ok: false, error: "Nome inválido (min 1, max 63 chars: a-z, 0-9, _, -)" });
  }
  if (!version || !ALLOWED_VERSION.test(version)) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ ok: false, error: "Versão inválida (semver esperado: x.y.z)" });
  }
  if (description && description.length > 2000) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ ok: false, error: "Descrição máxima 2000 caracteres" });
  }
  if (readme && readme.length > 100000) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ ok: false, error: "README máximo 100000 caracteres" });
  }

  const parsedKeywords = typeof keywords === "string" ? keywords.split(",").map(k => k.trim()).filter(Boolean) : (Array.isArray(keywords) ? keywords : []);
  const parsedDeps = typeof dependencies === "string" ? dependencies.split(",").map(d => d.trim()).filter(Boolean) : (Array.isArray(dependencies) ? dependencies : []);
  const sanitizedReadme = stripHtml(readme || "");
  const sanitizedDescription = stripHtml((description || "").slice(0, 2000));

  const exists = await Package.findOne({ name });
  if (exists) {
    if (String(exists.author) !== req.user.id) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(403).json({ ok: false, error: "Você não é o dono deste pacote" });
    }

    const existingVersion = exists.versions.find(v => v.version === version);
    if (existingVersion) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(409).json({ ok: false, error: `Versão ${version} já existe` });
    }

    exists.versions.push({
      version,
      description: sanitizedDescription || exists.description,
      license: license || "MIT",
      repository: repository || "",
      keywords: parsedKeywords,
      readme: sanitizedReadme,
      filePath: req.file ? req.file.path : null,
      fileSize: req.file ? req.file.size : 0,
      dependencies: parsedDeps,
    });

    exists.version = version;
    if (sanitizedDescription) exists.description = sanitizedDescription;
    exists.status = "pending";
    exists.reviewNotes = "";
    exists.reviewedBy = null;
    exists.reviewedAt = null;
    await exists.save();

    return res.status(201).json({ ok: true, package: exists });
  }

  const pkg = await Package.create({
    name,
    version,
    description: sanitizedDescription,
    license: license || "MIT",
    author: req.user.id,
    repository: repository || "",
    keywords: parsedKeywords,
    readme: sanitizedReadme,
    status: "pending",
    versions: [{
      version,
      description: sanitizedDescription,
      license: license || "MIT",
      repository: repository || "",
      keywords: parsedKeywords,
      readme: sanitizedReadme,
      filePath: req.file ? req.file.path : null,
      fileSize: req.file ? req.file.size : 0,
      dependencies: parsedDeps,
    }],
  });

  res.status(201).json({ ok: true, package: pkg });
}));

router.put("/:name", auth, asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name });
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  if (String(pkg.author) !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ ok: false, error: "Sem permissão" });
  }

  const allowed = ["description", "license", "repository", "keywords", "readme"];
  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      let value = req.body[field];
      if (field === "keywords" && typeof value === "string") {
        value = value.split(",").map(k => k.trim()).filter(Boolean);
      }
      if (field === "readme") value = stripHtml(String(value).slice(0, 100000));
      if (field === "description") value = stripHtml(String(value).slice(0, 2000));
      pkg[field] = value;
    }
  }

  if (pkg.versions.length > 0) {
    const latest = pkg.versions[pkg.versions.length - 1];
    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        let value = req.body[field];
        if (field === "keywords" && typeof value === "string") {
          value = value.split(",").map(k => k.trim()).filter(Boolean);
        }
        if (field === "readme") value = stripHtml(String(value).slice(0, 100000));
        if (field === "description") value = stripHtml(String(value).slice(0, 2000));
        latest[field] = value;
      }
    }
  }

  await pkg.save();
  res.json({ ok: true, package: pkg });
}));

router.post("/batch", auth, asyncHandler(async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : (req.body.entries || []);
  if (entries.length > 10) return res.status(400).json({ ok: false, error: "Máximo 10 pacotes por lote" });

  const results = [];
  for (const entry of entries) {
    if (!entry.name || !ALLOWED_NAME.test(entry.name)) {
      results.push({ ok: false, error: `Nome inválido: ${entry.name || ""}` });
      continue;
    }
    try {
      const exists = await Package.findOne({ name: entry.name });
      if (exists) {
        results.push({ ok: false, error: `Pacote ${entry.name} já existe` });
        continue;
      }
      const pkg = await Package.create({
        ...entry,
        name: entry.name,
        description: stripHtml((entry.description || "").slice(0, 2000)),
        author: req.user.id,
        status: "pending",
        readme: stripHtml((entry.readme || "").slice(0, 100000)),
        versions: [{
          version: entry.version || "1.0.0",
          description: stripHtml((entry.description || "").slice(0, 2000)),
          readme: stripHtml((entry.readme || "").slice(0, 100000)),
        }],
      });
      results.push({ ok: true, package: pkg });
    } catch (e) {
      results.push({ ok: false, error: e.message });
    }
  }

  res.status(201).json({ ok: true, results });
}));

router.post("/:name/download", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name });
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });

  if (pkg.status !== "approved") {
    const isOwner = req.user && String(pkg.author) === req.user.id;
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  }

  let version = pkg.version;
  if (req.query.version) {
    const ver = pkg.versions.find(v => v.version === req.query.version);
    if (!ver) return res.status(404).json({ ok: false, error: "Versão não encontrada" });
    version = ver.version;
  }

  const versionData = pkg.versions.find(v => v.version === version);
  const filePath = versionData?.filePath;
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, error: "Arquivo não encontrado" });
  }

  if (!isPathInside(filePath, UPLOADS_DIR)) {
    return res.status(500).json({ ok: false, error: "Caminho inválido" });
  }

  await Package.findByIdAndUpdate(pkg._id, { $inc: { downloads: 1 } });

  const filename = `${pkg.name}-${version}.tar.gz`;
  res.setHeader("Content-Type", "application/gzip");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.sendFile(filePath);
}));

router.get("/:name/source", optionalAuth, asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name });
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });

  const isOwner = req.user && String(pkg.author) === req.user.id;
  const isAdmin = req.user?.role === "admin";
  if (pkg.status !== "approved" && !isOwner && !isAdmin) {
    return res.status(403).json({ ok: false, error: "Pacote não aprovado" });
  }

  let version = pkg.version;
  if (req.query.version) {
    const ver = pkg.versions.find(v => v.version === req.query.version);
    if (!ver) return res.status(404).json({ ok: false, error: "Versão não encontrada" });
    version = ver.version;
  }

  const versionData = pkg.versions.find(v => v.version === version);
  const filePath = versionData?.filePath;
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, error: "Arquivo não encontrado" });
  }

  const extractId = randomBytes(4).toString("hex");
  const targetDir = path.join(EXTRACT_DIR, `${pkg.name}-${version}-${extractId}`);

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    await tar.extract({ file: filePath, cwd: targetDir, strict: true });

    const files = [];
    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (!isPathInside(fullPath, targetDir)) continue;
        if (entry.isSymbolicLink()) continue;
        if (entry.isDirectory()) {
          walk(fullPath);
        } else {
          const content = fs.readFileSync(fullPath, "utf-8");
          const relativePath = path.relative(targetDir, fullPath).replace(/\\/g, "/");
          files.push({ path: relativePath, content });
        }
      }
    }
    walk(targetDir);

    res.json({ ok: true, files });
  } catch (e) {
    res.json({ ok: false, error: "Erro ao extrair fonte: " + e.message });
  } finally {
    try { fs.rmSync(targetDir, { recursive: true, force: true }); } catch {}
  }
}));

export default router;
