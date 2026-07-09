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
import apiCoursesRouter from "./routes/api/courses.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import reviewsRouter from "./routes/api/reviews.js";
import commentsRouter from "./routes/api/comments.js";
import leaderboardRouter from "./routes/api/leaderboard.js";
import searchRouter from "./routes/api/search.js";
import quizzesRouter from "./routes/api/quizzes.js";
import dashboardApiRouter from "./routes/api/dashboard.js";
import statsRouter from "./routes/api/stats.js";
import webhooksRouter from "./routes/api/webhooks.js";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://static.cloudflareinsights.com", "'unsafe-inline'", "'unsafe-eval'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://static.cloudflareinsights.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      mediaSrc: ["'self'"],
      workerSrc: ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com"],
    },
  },
}));
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(i18n);

const sensitivePaths = ["/signup", "/login", "/2fa/verify", "/forgot-password", "/reset-password"];
const loginLimiter = (await import("express-rate-limit")).default({
  windowMs: 60 * 1000,
  max: 10,
  validate: { xForwardedForHeader: true },
  skip: req => !sensitivePaths.some(p => req.path === `/api/auth${p}`),
});

app.use(loginLimiter);

const packageLimiter = (await import("express-rate-limit")).default({
  windowMs: 60 * 1000,
  max: 30,
  validate: { xForwardedForHeader: true },
  skip: req => req.user?.role === "admin" || !req.path.startsWith("/api/packages"),
  message: { ok: false, error: "Too many requests. Slow down." },
});

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
app.use("/api/packages", packageLimiter, apiPackagesRouter);
app.use("/api/courses", apiCoursesRouter);
app.use("/api/admin", adminRouter);
app.use("/api/packages", packageLimiter, reviewsRouter);
app.use("/api/courses", commentsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/search", searchRouter);
app.use("/api/quizzes", quizzesRouter);
app.use("/api/dashboard", dashboardApiRouter);
app.use("/api/stats", statsRouter);
app.use("/api/webhooks", webhooksRouter);

app.use((req, res) => {
  res.status(404).render("en/404", { lang: "en" });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ ok: false, error: "Invalid JSON in request body" });
  }
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.code, err.field, err.message);
    return res.status(400).json({ ok: false, error: `Upload error: ${err.message}` });
  }
  if (err) {
    console.error("Unhandled error:", err.stack || err.message);
  }
  if (req.accepts("html")) {
    return res.status(500).render("en/500", { lang: "en", error: process.env.NODE_ENV === "development" ? err.message : "Internal server error" });
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

    // Auto-seed courses if database is empty
    try {
      const Course = (await import("./models/Course.js")).default;
      const count = await Course.countDocuments();
      if (count === 0) {
        console.log("[seed] No courses found, running auto-seed (EN + PT)...");
        const { seedCourse } = await import("./scripts/seed-course.js");
        const { seedCoursePt } = await import("./scripts/seed-course-pt.js");
        await seedCourse();
        await seedCoursePt();
        console.log("[seed] Both courses seeded successfully");
      } else {
        console.log(`[seed] ${count} course(s) already exist, skipping seed`);
      }
    } catch (e) {
      console.warn("[seed] Auto-seed skipped:", e.message);
    }
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
      redis.on("error", (err) => console.warn("Redis error:", err.message));
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
