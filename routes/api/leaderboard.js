import { Router } from "express";
import User from "../../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 100);
    const users = await User.find({ xp: { $gt: 0 } })
      .select("username xp level streak")
      .sort({ xp: -1 })
      .limit(limit)
      .lean();

    const ranked = users.map((u, i) => ({
      rank: i + 1,
      username: u.username,
      xp: u.xp || 0,
      level: u.level || 1,
      streak: u.streak || 0,
    }));

    res.json({ ok: true, leaderboard: ranked });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;