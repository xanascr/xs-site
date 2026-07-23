import { Router } from "express";
import { adminAuth, asyncHandler } from "../middleware/auth.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import { Hackathon } from "../models/Hackathon.js";
import Package from "../models/Package.js";

const router = Router();
router.use(adminAuth);

const ALLOWED_ROLES = ["user", "admin"];

function pick(obj, keys) {
  const result = {};
  for (const k of keys) {
    if (obj[k] !== undefined) result[k] = obj[k];
  }
  return result;
}

router.get("/stats", asyncHandler(async (req, res) => {
  const [users, courses, packages, docs] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Package.countDocuments(),
    DocArticle.countDocuments(),
  ]);
  res.json({ ok: true, stats: { users, courses, packages, docs } });
}));

router.get("/users", asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 }).limit(100);
  res.json({ ok: true, users: users.map(u => u.toPublic()) });
}));

router.patch("/users/:id/role", asyncHandler(async (req, res) => {
  if (!ALLOWED_ROLES.includes(req.body.role)) {
    return res.status(400).json({ ok: false, error: "Role inválido" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select("-password");
  res.json({ ok: true, user });
}));

router.get("/courses", asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ ok: true, courses });
}));

router.post("/courses", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "description", "image", "level", "published", "modules"]);
  const course = await Course.create(data);
  res.status(201).json({ ok: true, course });
}));

router.put("/courses/:id", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "description", "image", "level", "published", "modules"]);
  const course = await Course.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ ok: true, course });
}));

router.delete("/courses/:id", asyncHandler(async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

router.get("/docs", asyncHandler(async (req, res) => {
  const docs = await DocArticle.find().sort({ category: 1, order: 1 });
  res.json({ ok: true, docs });
}));

router.post("/docs", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "category", "body", "order", "published"]);
  const doc = await DocArticle.create(data);
  res.status(201).json({ ok: true, doc });
}));

router.put("/docs/:id", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "category", "body", "order", "published"]);
  const doc = await DocArticle.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ ok: true, doc });
}));

router.delete("/docs/:id", asyncHandler(async (req, res) => {
  await DocArticle.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

router.get("/playground-examples", asyncHandler(async (req, res) => {
  const examples = await PlaygroundExample.find().sort({ category: 1, order: 1 });
  res.json({ ok: true, examples });
}));

router.post("/playground-examples", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "code", "description", "category", "order", "published"]);
  const example = await PlaygroundExample.create(data);
  res.status(201).json({ ok: true, example });
}));

router.put("/playground-examples/:id", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "code", "description", "category", "order", "published"]);
  const example = await PlaygroundExample.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ ok: true, example });
}));

router.delete("/playground-examples/:id", asyncHandler(async (req, res) => {
  await PlaygroundExample.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

router.get("/hackathons", asyncHandler(async (req, res) => {
  const hackathons = await Hackathon.find().sort({ startDate: -1 });
  res.json({ ok: true, hackathons });
}));

router.post("/hackathons", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "description", "rules", "prize", "startDate", "endDate", "active"]);
  const h = await Hackathon.create(data);
  res.status(201).json({ ok: true, hackathon: h });
}));

router.put("/hackathons/:id", asyncHandler(async (req, res) => {
  const data = pick(req.body, ["title", "slug", "description", "rules", "prize", "startDate", "endDate", "active"]);
  const h = await Hackathon.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ ok: true, hackathon: h });
}));

router.get("/packages", asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const packages = await Package.find(filter).populate("author", "username email").sort({ createdAt: -1 }).lean();
  res.json({ ok: true, packages });
}));

router.get("/packages/:name", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name }).populate("author", "username email").populate("reviewedBy", "username").lean();
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  res.json({ ok: true, package: pkg });
}));

router.post("/packages/:name/approve", asyncHandler(async (req, res) => {
  const pkg = await Package.findOneAndUpdate(
    { name: req.params.name },
    { status: "approved", reviewedBy: req.user.id, reviewedAt: new Date(), reviewNotes: "" },
    { new: true }
  );
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  res.json({ ok: true, package: pkg });
}));

router.post("/packages/:name/reject", asyncHandler(async (req, res) => {
  const pkg = await Package.findOneAndUpdate(
    { name: req.params.name },
    { status: "rejected", reviewedBy: req.user.id, reviewedAt: new Date(), reviewNotes: req.body.reason || "" },
    { new: true }
  );
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  res.json({ ok: true, package: pkg });
}));

export default router;
