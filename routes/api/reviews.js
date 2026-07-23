import { Router } from "express";
import { auth, asyncHandler } from "../../middleware/auth.js";
import Review from "../../models/Review.js";
import Package from "../../models/Package.js";

const router = Router();

router.get("/:name/reviews", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name });
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });

  const reviews = await Review.find({ package: pkg._id })
    .populate("user", "username")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const total = reviews.length;
  const avgRating = total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;

  res.json({ ok: true, reviews, total, avgRating: Math.round(avgRating * 10) / 10 });
}));

router.post("/:name/reviews", auth, asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name });
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  if (pkg.status !== "approved") return res.status(400).json({ ok: false, error: "Só é possível avaliar pacotes aprovados" });

  const { rating, title, body } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ ok: false, error: "Avaliação deve ser entre 1 e 5" });
  }

  const existing = await Review.findOne({ package: pkg._id, user: req.user.id });
  if (existing) {
    existing.rating = rating;
    if (title !== undefined) existing.title = title.slice(0, 120);
    if (body !== undefined) existing.body = body.slice(0, 2000);
    await existing.save();
    await existing.populate("user", "username");
    return res.json({ ok: true, review: existing });
  }

  const review = await Review.create({
    package: pkg._id,
    user: req.user.id,
    rating,
    title: (title || "").slice(0, 120),
    body: (body || "").slice(0, 2000),
  });
  await review.populate("user", "username");
  res.status(201).json({ ok: true, review });
}));

router.delete("/:name/reviews/:reviewId", auth, asyncHandler(async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewId, user: req.user.id });
  if (!review) return res.status(404).json({ ok: false, error: "Review não encontrado" });
  await review.deleteOne();
  res.json({ ok: true });
}));

export default router;
