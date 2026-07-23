import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Comment from "../models/Comment.js";

const router = Router();

router.get("/:courseId/comments", async (req, res) => {
  const { lesson } = req.query;
  const filter = { course: req.params.courseId };
  if (lesson) filter.lessonSlug = lesson;
  const comments = await Comment.find(filter).populate("user", "username").sort({ createdAt: -1 });
  res.json({ ok: true, comments });
});

router.post("/:courseId/comments", auth, async (req, res) => {
  const comment = await Comment.create({
    user: req.user.id,
    course: req.params.courseId,
    lessonSlug: req.body.lessonSlug,
    body: req.body.body,
  });
  await comment.populate("user", "username");
  res.status(201).json({ ok: true, comment });
});

router.delete("/:courseId/comments/:id", auth, async (req, res) => {
  await Comment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
});

export default router;
