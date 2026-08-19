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

export function tokenFromRequest(req) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  const cookieToken = (req.headers.cookie || "").split(";").find(c => c.trim().startsWith("xana_token="));
  if (cookieToken) return cookieToken.split("=").slice(1).join("=");
  return null;
}

async function verifyToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET);
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

    const payload = await verifyToken(tokenFromRequest(req));
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
  const payload = await verifyToken(tokenFromRequest(req));
  if (payload) {
    const valid = await checkTokenVersion(payload);
    req.user = valid || undefined;
  }
  next();
}

export async function adminAuth(req, res, next) {
  try {
    const payload = await verifyToken(tokenFromRequest(req));
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

export async function adminPageAuth(req, res, next) {
  try {
    const payload = await verifyToken(tokenFromRequest(req));
    if (!payload) return res.redirect("/login");
    const valid = await checkTokenVersion(payload);
    if (!valid) return res.redirect("/login");
    if (valid.role !== "admin") return res.status(404).render("404", { page: "404" });
    req.user = valid;
    next();
  } catch (e) {
    res.status(500).render("500", { error: "Erro interno" });
  }
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
