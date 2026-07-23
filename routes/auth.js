import { Router } from "express";
import User from "../models/User.js";
import { auth, signToken } from "../middleware/auth.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, error: "Preencha todos os campos" });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ ok: false, error: "Usuário ou email já cadastrado" });
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

router.put("/me", auth, async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true }).select("-password");
  res.json({ ok: true, user });
});

router.put("/password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ ok: false, error: "Senha atual incorreta" });
  }
  user.password = newPassword;
  await user.save();
  res.json({ ok: true });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ ok: true, message: "Se o email existir, você receberá instruções" });
    user.generateResetToken();
    await user.save();
    // TODO: send email via service
    console.log("[email] Reset token for", user.email, ":", user.resetPasswordToken);
    res.json({ ok: true, message: "Instruções enviadas para o email" });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ ok: false, error: "Token inválido ou expirado" });
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();
    res.json({ ok: true, message: "Senha redefinida com sucesso" });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/logout", auth, (req, res) => {
  res.json({ ok: true });
});

export default router;
