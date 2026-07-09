import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://31.97.23.227:27017/xanascript";

import { seedCoursePt } from "./seed-course-pt.js";

async function reseed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    if (!db) { console.error("No db instance"); process.exit(1); }
    const collections = await db.listCollections().toArray();
    const names = collections.map(c => c.name);
    const dropTargets = ["courses", "modulequizzes", "enrollments", "certificates", "quizattempts"];
    for (const name of dropTargets) {
      if (names.includes(name)) {
        await db.collection(name).drop();
        console.log(`Dropped: ${name}`);
      }
    }

    await seedCoursePt();

    console.log("Reseed concluído!");
    process.exit(0);
  } catch (e) {
    console.error("Reseed failed:", e.message);
    process.exit(1);
  }
}

reseed();