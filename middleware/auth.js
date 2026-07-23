import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = process.env.JWT_SECRET;

export { SECRET };

export function signToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role, tokenVersion: user.tokenVersion },
    SECRET,
    { expiresIn: "7d" }
  );
}

async function verifyToken(header) {
  if (!header?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(header.slice(7), SECRET);
  } catch {
    return null;
  }
}

async function checkTokenVersion(payload) {
  try {
    const user = await User.findById(payload.id).select("tokenVersion");
    if (!user || (user.tokenVersion ?? 0) !== (payload.tokenVersion ?? 0)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function auth(req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];
    if (apiKey) {
      const user = await User.findOne({ "apiKeys.token": apiKey }).select("-password");
      if (!user) return res.status(401).json({ ok: false, error: "API key inválida" });
      req.user = { id: user._id, username: user.username, role: user.role, tokenVersion: user.tokenVersion };
      return next();
    }

    const payload = await verifyToken(req.headers.authorization);
    if (!payload) return res.status(401).json({ ok: false, error: "Token ausente ou inválido" });
    const valid = await checkTokenVersion(payload);
    if (!valid) return res.status(401).json({ ok: false, error: "Token revogado" });
    req.user = payload;
    next();
  } catch (e) {
    res.status(500).json({ ok: false, error: "Erro interno" });
  }
}

export async function optionalAuth(req, res, next) {
  const payload = await verifyToken(req.headers.authorization);
  if (payload) {
    const valid = await checkTokenVersion(payload);
    req.user = valid || undefined;
  }
  next();
}

export async function adminAuth(req, res, next) {
  try {
    const payload = await verifyToken(req.headers.authorization);
    if (!payload) return res.status(401).json({ ok: false, error: "Token ausente ou inválido" });
    const valid = await checkTokenVersion(payload);
    if (!valid) return res.status(401).json({ ok: false, error: "Token revogado" });
    if (valid.role !== "admin") return res.status(403).json({ ok: false, error: "Apenas admin" });
    req.user = valid;
    next();
  } catch (e) {
    res.status(500).json({ ok: false, error: "Erro interno" });
  }
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
