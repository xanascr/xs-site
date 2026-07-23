import { Router } from "express";
import { optionalAuth, auth, asyncHandler } from "../../middleware/auth.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import Certificate from "../../models/Certificate.js";

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
  const courses = await Course.find({ published: true }).sort({ createdAt: -1 });
  res.json({ ok: true, courses });
}));

router.get("/:slug", optionalAuth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).json({ ok: false, error: "Curso não encontrado" });
  let enrollment = null;
  let certificate = null;
  if (req.user) {
    enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
    certificate = await Certificate.findOne({ user: req.user.id, course: course._id });
  }
  res.json({ ok: true, course, enrollment, certificate });
}));

router.post("/:slug/enroll", auth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ ok: false, error: "Curso não encontrado" });
  const enrollment = await Enrollment.findOneAndUpdate(
    { user: req.user.id, course: course._id },
    { $setOnInsert: { user: req.user.id, course: course._id, completedLessons: [] } },
    { upsert: true, new: true }
  );
  res.json({ ok: true, enrollment });
}));

router.post("/:slug/lessons/:lessonSlug/complete", auth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ ok: false, error: "Curso não encontrado" });
  const enrollment = await Enrollment.findOneAndUpdate(
    { user: req.user.id, course: course._id },
    { $addToSet: { completedLessons: { lessonSlug: req.params.lessonSlug, completedAt: new Date() } } },
    { upsert: true, new: true }
  );
  const allLessons = course.modules.flatMap(m => m.lessons);
  const completed = enrollment.completedLessons.map(l => l.lessonSlug);
  const allDone = allLessons.every(l => completed.includes(l.slug));
  if (allDone && !enrollment.completed) {
    enrollment.completed = true;
    enrollment.completedAt = new Date();
    await enrollment.save();
  }
  res.json({ ok: true, enrollment });
}));

router.get("/:slug/certificate", auth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ ok: false, error: "Curso não encontrado" });
  let cert = await Certificate.findOne({ user: req.user.id, course: course._id });
  if (!cert) {
    const crypto = await import("crypto");
    cert = await Certificate.create({
      user: req.user.id,
      course: course._id,
      code: crypto.randomBytes(8).toString("hex").toUpperCase(),
    });
  }
  res.json({ ok: true, certificate: cert });
}));

export default router;
