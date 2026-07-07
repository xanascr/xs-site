import { Router } from "express";
import Package from "../models/Package.js";

const router = Router();

router.get("/", async (req, res) => {
  const lang = req.query.lang || req.lang || "en";
  try {
    const q = req.query.q || "";
    const filter = { status: "approved" };
    if (q) filter.$text = { $search: q };
    const packages = await Package.find(filter)
      .sort({ downloads: -1 })
      .limit(50)
      .lean();
    res.render(`${lang}/packages/index`, { lang, packages, query: q, page: "packages" });
  } catch {
    res.render(`${lang}/packages/index`, { lang, packages: [], query: "", page: "packages" });
  }
});

router.get("/dashboard", (req, res) => {
  const lang = req.query.lang || req.lang || "en";
  res.render(`${lang}/packages/dashboard`, { lang, page: "packages" });
});

router.get("/:name", async (req, res) => {
  const lang = req.query.lang || req.lang || "en";
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" }).lean();
    if (!pkg) return res.status(404).render("en/404", { lang });
    res.render(`${lang}/packages/show`, { lang, pkg, page: "packages" });
  } catch {
    res.status(404).render("en/404", { lang });
  }
});

export default router;
