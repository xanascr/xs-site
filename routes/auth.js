import { Router } from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { auth, signToken, asyncHandler } from "../middleware/auth.js";

const router = Router();

router.post("/signup", asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ ok: false, error: "Preencha todos os campos" });
  }
  if (password.length < 6) {
    return res.status(400).json({ ok: false, error: "Senha deve ter no mínimo 6 caracteres" });
  }
  if (!/^[a-z0-9_-]{3,32}$/.test(username)) {
    return res.status(400).json({ ok: false, error: "Usuário deve ter 3-32 caracteres (a-z, 0-9, _, -)" });
  }
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ ok: false, error: "Usuário ou email já cadastrado" });
  const user = await User.create({ username, email, password });
  const token = signToken(user);
  res.status(201).json({ ok: true, token, user: user.toPublic() });
}));

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false, error: "Email e senha obrigatórios" });
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ ok: false, error: "Email ou senha inválidos" });
  }
  const token = signToken(user);
  res.json({ ok: true, token, user: user.toPublic() });
}));

router.post("/logout", auth, (req, res) => {
  res.json({ ok: true });
});

router.get("/me", auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ ok: true, user });
}));

router.put("/me", auth, asyncHandler(async (req, res) => {
  const allowed = {};
  if (req.body.username) allowed.username = req.body.username;
  if (req.body.email) allowed.email = req.body.email;
  const user = await User.findByIdAndUpdate(req.user.id, allowed, { new: true, runValidators: true }).select("-password");
  res.json({ ok: true, user });
}));

router.put("/password", auth, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ ok: false, error: "Campos obrigatórios" });
  if (newPassword.length < 6) return res.status(400).json({ ok: false, error: "Nova senha deve ter no mínimo 6 caracteres" });
  const user = await User.findById(req.user.id);
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ ok: false, error: "Senha atual incorreta" });
  }
  user.password = newPassword;
  await user.save();
  res.json({ ok: true });
}));

router.post("/forgot-password", asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ ok: true, message: "Se o email existir, você receberá instruções" });
  user.generateResetToken();
  await user.save();
  console.log("[email] Reset token for", user.email, ":", user.resetPasswordToken);
  res.json({ ok: true, message: "Instruções enviadas para o email" });
}));

router.post("/reset-password/:token", asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) return res.status(400).json({ ok: false, error: "Token inválido ou expirado" });
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).json({ ok: false, error: "Senha deve ter no mínimo 6 caracteres" });
  }
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();
  res.json({ ok: true, message: "Senha redefinida com sucesso" });
}));

router.post("/api-keys", auth, asyncHandler(async (req, res) => {
  const token = crypto.randomBytes(24).toString("hex");
  const name = (req.body.name || "default").slice(0, 50);
  const user = await User.findById(req.user.id);
  user.apiKeys.push({ token, name });
  await user.save();
  res.status(201).json({ ok: true, key: { token, name } });
}));

router.get("/api-keys", auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("apiKeys");
  res.json({ ok: true, keys: (user?.apiKeys || []).map(k => ({ name: k.name, createdAt: k.createdAt, prefix: k.token.slice(0, 8) + "..." })) });
}));

router.delete("/api-keys/:prefix", auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.apiKeys = user.apiKeys.filter(k => !k.token.startsWith(req.params.prefix));
  await user.save();
  res.json({ ok: true });
}));

export default router;
