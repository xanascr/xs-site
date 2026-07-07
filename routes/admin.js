import { Router } from "express";
import Package from "../models/Package.js";
import User from "../models/User.js";
import { adminOrApiKey } from "../middleware/auth.js";
import { sendPackageApproved, sendPackageRejected } from "../services/email.js";

const VALID_STATUSES = ["pending", "approved", "rejected"];

const router = Router();

router.use(adminOrApiKey);

router.get("/packages", async (req, res) => {
  try {
    const status = VALID_STATUSES.includes(req.query.status) ? req.query.status : "pending";
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
    ).populate("authorId", "username email");
    if (!pkg) return res.status(404).json({ ok: false, error: "Pending package not found" });

    const redis = req.app.locals.redis;
    if (redis) {
      await redis.del(`cache:/api/packages`);
      await redis.del(`cache:/api/packages/${pkg.name}`);
    }

    // Email notification to author
    if (pkg.authorId?.email) {
      try {
        await sendPackageApproved(pkg.authorId.email, pkg.authorId.username, pkg.name, pkg.version);
      } catch (e) {
        console.warn("Failed to send approval email:", e.message);
      }
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
    ).populate("authorId", "username email");
    if (!pkg) return res.status(404).json({ ok: false, error: "Pending package not found" });

    // Email notification to author
    if (pkg.authorId?.email) {
      try {
        await sendPackageRejected(pkg.authorId.email, pkg.authorId.username, pkg.name, reason);
      } catch (e) {
        console.warn("Failed to send rejection email:", e.message);
      }
    }

    res.json({ ok: true, package: pkg });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
