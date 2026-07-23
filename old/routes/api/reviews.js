import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import Review from "../../models/Review.js";
import Package from "../../models/Package.js";
import User from "../../models/User.js";

const router = Router();

// ── List reviews for a package ───────────────────────────────────────────
router.get("/:name/reviews", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("_id").lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found" });
    const reviews = await Review.find({ packageId: pkg._id }).sort({ createdAt: -1 }).limit(50).lean();
    res.json({ ok: true, reviews });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Create/update review ─────────────────────────────────────────────────
router.post("/:name/reviews", auth, async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("_id").lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found" });
    const { rating, title, body } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ ok: false, error: "Rating must be 1-5" });
    const existing = await Review.findOne({ packageId: pkg._id, userId: req.user.id });
    if (existing) {
      existing.rating = rating;
      if (title !== undefined) existing.title = title;
      if (body !== undefined) existing.body = body;
      existing.updatedAt = new Date();
      await existing.save();
      return res.json({ ok: true, review: existing, updated: true });
    }
    const review = await Review.create({ packageId: pkg._id, userId: req.user.id, rating, title, body });
    res.json({ ok: true, review });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Delete review ────────────────────────────────────────────────────────
router.delete("/:name/reviews/:reviewId", auth, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.reviewId, userId: req.user.id });
    if (!review) return res.status(404).json({ ok: false, error: "Review not found or not yours" });
    await review.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;