import { Router } from "express";
import { auth, optionalAuth } from "../middleware/auth.js";
import { Hackathon, HackathonSubmission } from "../models/Hackathon.js";

const router = Router();

router.get("/", async (req, res) => {
  const hackathons = await Hackathon.find().sort({ startDate: -1 });
  res.json({ ok: true, hackathons });
});

router.get("/:id", async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);
  if (!hackathon) return res.status(404).json({ ok: false, error: "Hackathon não encontrado" });
  const submissions = await HackathonSubmission.find({ hackathon: hackathon._id }).populate("user", "username");
  res.json({ ok: true, hackathon, submissions });
});

router.post("/:id/submit", auth, async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);
  if (!hackathon || !hackathon.active) return res.status(400).json({ ok: false, error: "Hackathon não ativo" });
  const existing = await HackathonSubmission.findOne({ hackathon: hackathon._id, user: req.user.id });
  if (existing) return res.status(409).json({ ok: false, error: "Você já submeteu um projeto" });

  const submission = await HackathonSubmission.create({
    hackathon: hackathon._id,
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
  });
  res.status(201).json({ ok: true, submission });
});

export default router;
