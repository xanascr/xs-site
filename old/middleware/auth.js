import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashToken } from "../services/apiKey.js";

const SECRET = process.env.JWT_SECRET;

export { SECRET };

export function signToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role, tokenVersion: user.tokenVersion },
    SECRET,
    { expiresIn: "7d" }
  );
}

export async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Missing token" });
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET);
    try {
      const user = await User.findById(payload.id).select("tokenVersion");
      if (!user || (user.tokenVersion ?? 0) !== (payload.tokenVersion ?? 0)) {
        return res.status(401).json({ ok: false, error: "Token revoked" });
      }
      req.user = payload;
      next();
    } catch (err) {
      console.error("Auth DB error:", err);
      res.status(500).json({ ok: false, error: "Internal server error" });
    }
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.user = jwt.verify(header.slice(7), SECRET);
    } catch {
      req.user = undefined;
    }
  }
  next();
}

export function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Missing token" });
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Admin only" });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}

export async function adminOrApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey) {
    try {
      const hash = hashToken(apiKey);
      const user = await User.findOne({ "apiKeys.token": hash }).select("username email role");
      if (user) {
        await User.updateOne(
          { _id: user._id, "apiKeys.token": hash },
          { $set: { "apiKeys.$.lastUsedAt": new Date() } }
        );
        req.user = { id: user._id, username: user.username, role: user.role };
        return next();
      }
    } catch { /* fall through */ }
  }
  return adminAuth(req, res, next);
}
