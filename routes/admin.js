import { Router } from "express";
import Package from "../models/Package.js";
import { adminOrApiKey } from "../middleware/auth.js";

const router = Router();

router.use(adminOrApiKey);

router.get("/packages", async (req, res) => {
  try {
    const status = req.query.status || "pending";
    const packages = await Package.find({ status })
      .populate("authorId", "username email")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, packages });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/packages/:name/approve", async (req, res) => {
  try {
    const pkg = await Package.findOneAndUpdate(
      { name: req.params.name, status: "pending" },
      { status: "approved", reviewedBy: req.user.id, reviewedAt: new Date() },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ ok: false, error: "Pending package not found" });

    const redis = req.app.locals.redis;
    if (redis) {
      await redis.del(`cache:/api/packages`);
      await redis.del(`cache:/api/packages/${pkg.name}`);
    }

    res.json({ ok: true, package: pkg });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/packages/:name/reject", async (req, res) => {
  try {
    const { reason } = req.body;
    const pkg = await Package.findOneAndUpdate(
      { name: req.params.name, status: "pending" },
      { status: "rejected", reviewNotes: reason || "", reviewedBy: req.user.id, reviewedAt: new Date() },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ ok: false, error: "Pending package not found" });
    res.json({ ok: true, package: pkg });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
