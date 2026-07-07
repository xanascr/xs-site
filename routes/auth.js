import { Router } from "express";
import User from "../models/User.js";
import { signToken, auth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, error: "username, email, password required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });
    }
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ ok: false, error: "Username or email already taken" });
    }
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    res.status(201).json({ ok: true, token, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ ok: false, error: "username and password required" });
    }
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }
    const token = signToken(user);
    res.json({ ok: true, token, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    res.json({ ok: true, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
