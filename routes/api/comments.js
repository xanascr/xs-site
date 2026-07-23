import { Router } from "express";
import { auth, asyncHandler } from "../../middleware/auth.js";
import Comment from "../../models/Comment.js";

const router = Router();

router.get("/:courseId/comments", asyncHandler(async (req, res) => {
  const filter = { course: req.params.courseId };
  if (req.query.lesson) filter.lessonSlug = req.query.lesson;
  const comments = await Comment.find(filter).populate("user", "username").sort({ createdAt: -1 });
  res.json({ ok: true, comments });
}));

router.post("/:courseId/comments", auth, asyncHandler(async (req, res) => {
  if (!req.body.body?.trim()) return res.status(400).json({ ok: false, error: "Comentário vazio" });
  if (req.body.body.length > 5000) return res.status(400).json({ ok: false, error: "Comentário muito longo" });
  const comment = await Comment.create({
    user: req.user.id,
    course: req.params.courseId,
    lessonSlug: req.body.lessonSlug,
    body: req.body.body.trim(),
  });
  await comment.populate("user", "username");
  res.status(201).json({ ok: true, comment });
}));

router.delete("/:courseId/comments/:id", auth, asyncHandler(async (req, res) => {
  await Comment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
}));

export default router;
