import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth, signToken, SECRET } from "../middleware/auth.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, error: "Preencha todos os campos" });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ ok: false, error: "Usuário ou email já cadastrado" });
    }
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    res.status(201).json({ ok: true, token, user: user.toPublic() });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Email ou senha inválidos" });
    }
    const token = signToken(user);
    res.json({ ok: true, token, user: user.toPublic() });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ ok: true, user });
});

export default router;
