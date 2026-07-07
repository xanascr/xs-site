import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";

import { i18n } from "./middleware/i18n.js";
import indexRouter from "./routes/index.js";
import apiPackagesRouter from "./routes/api/packages.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(i18n);

const sensitivePaths = ["/signup", "/login", "/2fa/verify", "/forgot-password", "/reset-password"];
const loginLimiter = (await import("express-rate-limit")).default({
  windowMs: 60 * 1000,
  max: 10,
  validate: { xForwardedForHeader: false },
  skip: req => !sensitivePaths.some(p => req.path === `/api/auth${p}`),
});

app.use(loginLimiter);

app.locals.site = {
  name: "XanaScript",
  url: "https://xanascript.xyz",
  github: "https://github.com/xanascr/xs",
};

let npmDownloadsCache = null;
let npmDownloadsTime = 0;

async function getNpmDownloads() {
  if (Date.now() - npmDownloadsTime < 3600000 && npmDownloadsCache !== null) {
    return npmDownloadsCache;
  }
  try {
    const { data } = await axios.get("https://api.npmjs.org/downloads/point/last-month/xanascript", { timeout: 3000 });
    npmDownloadsCache = data.downloads;
    npmDownloadsTime = Date.now();
    return data.downloads;
  } catch {
    return npmDownloadsCache;
  }
}

app.use(async (req, res, next) => {
  res.locals.npmDownloads = await getNpmDownloads();
  next();
});

// ── Health check for Coolify / Docker ──────────────────────────────────
app.get("/api/health", async (req, res) => {
  const checks = {
    app: true,
    mongo: false,
    redis: false,
  };
  try {
    if (mongoose.connection.readyState === 1) checks.mongo = true;
  } catch {}
  if (app.locals.redis) {
    try {
      await app.locals.redis.ping();
      checks.redis = true;
    } catch {}
  }
  const ok = checks.app && checks.mongo;
  res.status(ok ? 200 : 503).json({ ok, timestamp: new Date().toISOString(), checks });
});

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/packages", apiPackagesRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  const fallbackLang = req.lang || "en";
  res.status(404).render(`${fallbackLang}/404`, { lang: fallbackLang });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (req.accepts("html")) {
    const fallbackLang = req.lang || "en";
    return res.status(500).render(`${fallbackLang}/404`, { lang: fallbackLang });
  }
  res.status(500).json({ ok: false, error: "Internal server error" });
});

async function start() {
  if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET environment variable is required");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      minPoolSize: 2,
      maxPoolSize: 20,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.error("FATAL: MongoDB unavailable:", e.message);
    process.exit(1);
  }

  const redisUrl = process.env.REDIS_URL || "";
  if (redisUrl) {
    try {
      const parsed = new URL(redisUrl);
      const redis = createClient({
        socket: {
          host: parsed.hostname,
          port: parseInt(parsed.port || "6379"),
          reconnectStrategy: false,
        },
        password: parsed.password ? decodeURIComponent(parsed.password) : undefined,
      });
      redis.on("error", () => {});
      await redis.connect();
      app.locals.redis = redis;
      console.log("Redis connected");
    } catch (e) {
      console.warn("Redis unavailable, cache disabled:", e.message);
    }
  }

  app.listen(process.env.PORT || 3010, () => {
    console.log(`XanaScript site running on port ${process.env.PORT || 3010}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
