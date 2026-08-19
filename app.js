import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import jwt from "jsonwebtoken";

import { renderMarkdown } from "./services/markdown.js";

import indexRouter from "./routes/index.js";
import seoRouter from "./routes/seo.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import apiPackagesRouter from "./routes/api/packages.js";
import apiCoursesRouter from "./routes/api/courses.js";
import apiCommentsRouter from "./routes/api/comments.js";
import apiPlaygroundRouter from "./routes/api/playground.js";
import apiQuizRouter from "./routes/api/quiz.js";
import apiReviewsRouter from "./routes/api/reviews.js";
import apiSearchRouter from "./routes/api/search.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main");
app.locals.renderMarkdown = renderMarkdown;

app.use(expressLayouts);

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("base64");
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://fonts.googleapis.com", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://*.google-analytics.com", (req, res) => `'nonce-${res.locals.cspNonce}'`],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://www.google-analytics.com", "https://*.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://*.doubleclick.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const header = req.headers.authorization;
  const cookieToken = (req.headers.cookie || "").split(";").find(c => c.trim().startsWith("xana_token="));
  const token = header?.startsWith("Bearer ") ? header.slice(7) : (cookieToken ? cookieToken.split("=").slice(1).join("=") : null);
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      req.user = null;
    }
  }
  res.locals.user = req.user;
  res.locals.path = req.path;
  next();
});

app.use("/", seoRouter);

// Maintenance/launch gate: every page request renders only the countdown.
const LAUNCH_AT = new Date("2026-08-18T14:00:00-03:00");
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (req.path.startsWith("/uploads/")) return next();
  if (req.path.startsWith("/api/")) return next();
  if (req.accepts("html")) {
    if (LAUNCH_AT.getTime() - Date.now() > 0) {
      return res.render("launch", { layout: false });
    }
  }
  next();
});

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/packages", apiPackagesRouter);
app.use("/api/courses", apiCoursesRouter);
app.use("/api/courses", apiCommentsRouter);
app.use("/api/playground", apiPlaygroundRouter);
app.use("/api/courses", apiQuizRouter);
app.use("/api/packages", apiReviewsRouter);
app.use("/api/search", apiSearchRouter);

app.use((req, res) => {
  res.status(404).render("404", { page: "404" });
});

app.use((err, req, res, next) => {
  if (err?.name === "MulterError") {
    return res.status(400).json({ ok: false, error: `Erro no upload: ${err.message}` });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ ok: false, error: "Arquivo muito grande" });
  }
  console.error("Unhandled error:", err.stack || err.message);
  if (req.accepts("html")) {
    return void res.status(500).render("500", { error: process.env.NODE_ENV === "development" ? err.message : "Erro interno" });
  }
  res.status(500).json({ ok: false, error: "Erro interno" });
});

async function start() {
  if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET é obrigatório");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      minPoolSize: 2,
      maxPoolSize: 20,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB conectado");

    const Course = (await import("./models/Course.js")).default;
    const count = await Course.countDocuments();
    if (count === 0) {
      console.log("[seed] Nenhum curso encontrado, rodando seed...");
      const { seed } = await import("./scripts/seed.js");
      await seed();
    }
  } catch (e) {
    console.error("FATAL: MongoDB indisponível:", e.message);
    process.exit(1);
  }

  app.listen(process.env.PORT || 3010, () => {
    console.log(`XanaScript site rodando na porta ${process.env.PORT || 3010}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
