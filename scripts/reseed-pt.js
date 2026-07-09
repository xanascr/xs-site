import "dotenv/config";
import mongoose from "mongoose";
import { seedCoursePt } from "./seed-course-pt.js";

async function reseed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not set in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
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