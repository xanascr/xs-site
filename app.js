import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

import { i18n } from "./middleware/i18n.js";
import indexRouter from "./routes/index.js";
import packagesRouter from "./routes/packages.js";
import apiPackagesRouter from "./routes/api/packages.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(i18n);

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

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/packages", packagesRouter);
app.use("/api/packages", apiPackagesRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).render("en/404", { lang: "en" });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected");
  } catch (e) {
    console.warn("MongoDB unavailable:", e.message);
  }

  try {
    const redis = createClient({ url: process.env.REDIS_URL });
    redis.on("error", (err) => console.warn("Redis connection error:", err.message));
    await redis.connect();
    app.locals.redis = redis;
    console.log("Redis connected");
  } catch (e) {
    console.warn("Redis unavailable, cache disabled:", e.message);
  }

  app.listen(process.env.PORT || 3010, () => {
    console.log(`XanaScript site running on port ${process.env.PORT || 3010}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
