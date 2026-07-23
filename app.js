import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import apiPackagesRouter from "./routes/api/packages.js";
import apiCoursesRouter from "./routes/api/courses.js";
import apiCommentsRouter from "./routes/api/comments.js";
import apiHackathonsRouter from "./routes/api/hackathons.js";
import apiPlaygroundRouter from "./routes/api/playground.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      styleSrc: ["'self'", "https://cdn.tailwindcss.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const loginLimiter = (await import("express-rate-limit")).default({
  windowMs: 60 * 1000,
  max: 10,
  validate: { xForwardedForHeader: true },
  skip: req => !["/signup", "/login", "/forgot-password", "/reset-password"].some(p => req.path === `/api/auth${p}`),
});
app.use(loginLimiter);

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.path = req.path;
  next();
});

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/packages", apiPackagesRouter);
app.use("/api/courses", apiCoursesRouter);
app.use("/api/courses", apiCommentsRouter);
app.use("/api/hackathons", apiHackathonsRouter);
app.use("/api/playground", apiPlaygroundRouter);

app.use((req, res) => {
  res.status(404).render("404", { page: "404" });
});

app.use((err, req, res, next) => {
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
