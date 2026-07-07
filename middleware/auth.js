import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";

export function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, SECRET, { expiresIn: "7d" });
}

export function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Missing token" });
  }
  try {
    req.user = jwt.verify(header.slice(7), SECRET);
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.user = jwt.verify(header.slice(7), SECRET);
    } catch { /* ignore */ }
  }
  next();
}

export function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "Missing token" });
  }
  try {
    const user = jwt.verify(header.slice(7), SECRET);
    if (user.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Admin only" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}

export function adminOrApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    req.user = { role: "admin", username: "api-key" };
    return next();
  }
  return adminAuth(req, res, next);
}
