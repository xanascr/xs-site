import { Router } from "express";
import Package from "../../models/Package.js";
import PackageWebhook from "../../models/PackageWebhook.js";

const router = Router();

router.post("/packages/:name/subscribe", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("_id name").lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found" });
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    const existing = await PackageWebhook.findOne({ packageId: pkg._id, email: email.toLowerCase() });
    if (existing) return res.json({ ok: true, message: "Already subscribed" });
    await PackageWebhook.create({ packageId: pkg._id, email: email.toLowerCase() });
    res.json({ ok: true, message: "You will be notified when this package is updated." });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/packages/:name/unsubscribe", async (req, res) => {
  try {
    const pkg = await Package.findOne({ name: req.params.name }).select("_id").lean();
    if (!pkg) return res.status(404).json({ ok: false, error: "Package not found" });
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: "Email required" });
    await PackageWebhook.deleteOne({ packageId: pkg._id, email: email.toLowerCase() });
    res.json({ ok: true, message: "Unsubscribed." });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;