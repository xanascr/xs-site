import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

import { i18n } from "./middleware/i18n.js";
import { cacheMiddleware } from "./middleware/cache.js";
import indexRouter from "./routes/index.js";
import packagesRouter from "./routes/packages.js";
import apiPackagesRouter from "./routes/api/packages.js";

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

async function getNpmDownloads() {
  try {
    const { data } = await axios.get(
      "https://api.npmjs.org/downloads/point/last-month/xanascript"
    );
    return data.downloads;
  } catch {
    return null;
  }
}

app.use(async (req, res, next) => {
  res.locals.npmDownloads = await getNpmDownloads();
  next();
});

app.use("/", indexRouter);
app.use("/packages", packagesRouter);
app.use("/api/packages", apiPackagesRouter);

app.use((req, res) => {
  res.status(404).render("en/404", { lang: "en" });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log("MongoDB connected");
  } catch (e) {
    console.warn("MongoDB unavailable, registry will be limited:", e.message);
  }

  try {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
    app.locals.redis = redis;
    console.log("Redis connected");
  } catch (e) {
    console.warn("Redis unavailable, cache disabled:", e.message);
  }

  app.locals.seaweedfs = {
    async upload(name, buffer) {
      try {
        const { data } = await axios.post(
          `${process.env.SEAWEEDFS_VOLUME}/api/upload`,
          buffer,
          { headers: { "Content-Type": "application/octet-stream" } }
        );
        return data.fid;
      } catch {
        return null;
      }
    },
    async download(fid) {
      try {
        const { data } = await axios.get(
          `${process.env.SEAWEEDFS_VOLUME}/${fid}`,
          { responseType: "arraybuffer" }
        );
        return data;
      } catch {
        return null;
      }
    },
  };

  app.listen(process.env.PORT || 3000, () => {
    console.log(`XanaScript site running on port ${process.env.PORT || 3000}`);
  });
}

start();
