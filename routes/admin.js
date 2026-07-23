import { Router } from "express";
import { adminAuth } from "../middleware/auth.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import PageContent from "../models/PageContent.js";
import { Hackathon } from "../models/Hackathon.js";
import Package from "../models/Package.js";

const router = Router();
router.use(adminAuth);

router.get("/stats", async (req, res) => {
  const [users, courses, packages, docs] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Package.countDocuments(),
    DocArticle.countDocuments(),
  ]);
  res.json({ ok: true, stats: { users, courses, packages, docs } });
});

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 }).limit(100);
  res.json({ ok: true, users });
});

router.patch("/users/:id/role", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select("-password");
  res.json({ ok: true, user });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ ok: true, courses });
});

router.post("/courses", async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ ok: true, course });
});

router.put("/courses/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ ok: true, course });
});

router.delete("/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.get("/docs", async (req, res) => {
  const docs = await DocArticle.find().sort({ category: 1, order: 1 });
  res.json({ ok: true, docs });
});

router.post("/docs", async (req, res) => {
  const doc = await DocArticle.create(req.body);
  res.status(201).json({ ok: true, doc });
});

router.put("/docs/:id", async (req, res) => {
  const doc = await DocArticle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ ok: true, doc });
});

router.delete("/docs/:id", async (req, res) => {
  await DocArticle.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.get("/playground-examples", async (req, res) => {
  const examples = await PlaygroundExample.find().sort({ category: 1, order: 1 });
  res.json({ ok: true, examples });
});

router.post("/playground-examples", async (req, res) => {
  const example = await PlaygroundExample.create(req.body);
  res.status(201).json({ ok: true, example });
});

router.put("/playground-examples/:id", async (req, res) => {
  const example = await PlaygroundExample.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ ok: true, example });
});

router.delete("/playground-examples/:id", async (req, res) => {
  await PlaygroundExample.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.get("/hackathons", async (req, res) => {
  const hackathons = await Hackathon.find().sort({ startDate: -1 });
  res.json({ ok: true, hackathons });
});

router.post("/hackathons", async (req, res) => {
  const h = await Hackathon.create(req.body);
  res.status(201).json({ ok: true, hackathon: h });
});

router.put("/hackathons/:id", async (req, res) => {
  const h = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ ok: true, hackathon: h });
});

router.get("/packages", async (req, res) => {
  const packages = await Package.find().populate("author", "username").sort({ createdAt: -1 });
  res.json({ ok: true, packages });
});

router.patch("/packages/:id/approve", async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json({ ok: true, package: pkg });
});

export default router;
