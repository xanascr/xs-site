import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Package from "../models/Package.js";

const router = Router();

router.get("/", async (req, res) => {
  const packages = await Package.find({ approved: true, published: true })
    .populate("author", "username")
    .sort({ downloads: -1 })
    .limit(50);
  res.json({ ok: true, packages });
});

router.get("/:name", async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name }).populate("author", "username");
  if (!pkg) return res.status(404).json({ ok: false, error: "Pacote não encontrado" });
  await Package.findByIdAndUpdate(pkg._id, { $inc: { downloads: 1 } });
  res.json({ ok: true, package: pkg });
});

router.post("/", auth, async (req, res) => {
  const { name, description } = req.body;
  const exists = await Package.findOne({ name });
  if (exists) return res.status(409).json({ ok: false, error: "Pacote já existe" });
  const pkg = await Package.create({ name, description, author: req.user.id });
  res.status(201).json({ ok: true, package: pkg });
});

export default router;
