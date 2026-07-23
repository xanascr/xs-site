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

export async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Token ausente" });
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET);
    const user = await User.findById(payload.id).select("tokenVersion");
    if (!user || (user.tokenVersion ?? 0) !== (payload.tokenVersion ?? 0)) {
      return res.status(401).json({ ok: false, error: "Token revogado" });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Token inválido ou expirado" });
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
    return res.status(401).json({ ok: false, error: "Token ausente" });
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Apenas admin" });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Token inválido" });
  }
}
