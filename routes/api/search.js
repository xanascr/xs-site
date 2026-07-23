import { Router } from "express";
import { asyncHandler } from "../../middleware/auth.js";
import Package from "../../models/Package.js";
import DocArticle from "../../models/DocArticle.js";
import Course from "../../models/Course.js";

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) return res.json({ ok: true, results: { packages: [], docs: [], courses: [] } });
  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const [packages, docs, courses] = await Promise.all([
    Package.find({ status: "approved", $or: [{ name: regex }, { description: regex }] })
      .select("name description version")
      .limit(5)
      .lean(),
    DocArticle.find({ published: true, $or: [{ title: regex }, { body: regex }] })
      .select("title slug category")
      .limit(5)
      .lean(),
    Course.find({ published: true, $or: [{ title: regex }, { description: regex }] })
      .select("title slug level")
      .limit(5)
      .lean(),
  ]);

  res.json({ ok: true, results: { packages, docs, courses } });
}));

export default router;
