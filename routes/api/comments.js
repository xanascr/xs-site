import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/auth.js";
import Comment from "../../models/Comment.js";
import Course from "../../models/Course.js";
import User from "../../models/User.js";

const router = Router();

// ── List comments for a lesson ───────────────────────────────────────────
router.get("/:slug/lessons/:lessonSlug/comments", optionalAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const comments = await Comment.find({ courseId: course._id, lessonSlug: req.params.lessonSlug })
      .sort({ createdAt: -1 }).limit(100).lean();
    res.json({ ok: true, comments });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Create comment ───────────────────────────────────────────────────────
router.post("/:slug/lessons/:lessonSlug/comments", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const { body, parentId } = req.body;
    if (!body || !body.trim()) return res.status(400).json({ ok: false, error: "Comment body is required" });
    if (body.length > 2000) return res.status(400).json({ ok: false, error: "Comment too long (max 2000)" });
    const user = await User.findById(req.user.id).select("username").lean();
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const comment = await Comment.create({
      courseId: course._id,
      lessonSlug: req.params.lessonSlug,
      userId: req.user.id,
      username: user.username,
      body: body.trim(),
      parentId: parentId || null,
    });
    res.json({ ok: true, comment });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Delete comment ───────────────────────────────────────────────────────
router.delete("/:slug/lessons/:lessonSlug/comments/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId, userId: req.user.id });
    if (!comment) return res.status(404).json({ ok: false, error: "Comment not found or not yours" });
    await comment.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;