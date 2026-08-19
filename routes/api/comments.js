import { Router } from "express";
import mongoose from "mongoose";
import { auth, asyncHandler } from "../../middleware/auth.js";
import Comment from "../../models/Comment.js";

const router = Router();

function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.get("/:courseId/comments", asyncHandler(async (req, res) => {
  if (!validId(req.params.courseId)) return res.status(400).json({ ok: false, error: "Curso inválido" });
  const filter = { course: req.params.courseId };
  if (req.query.lesson) filter.lessonSlug = req.query.lesson;
  const comments = await Comment.find(filter).populate("user", "username").sort({ createdAt: -1 });
  res.json({ ok: true, comments });
}));

router.post("/:courseId/comments", auth, asyncHandler(async (req, res) => {
  if (!validId(req.params.courseId)) return res.status(400).json({ ok: false, error: "Curso inválido" });
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
  if (!validId(req.params.id)) return res.status(400).json({ ok: false, error: "Comentário inválido" });
  await Comment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
}));

export default router;
