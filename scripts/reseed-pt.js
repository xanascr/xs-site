import mongoose from "mongoose";
import { seedCoursePt } from "./seed-course-pt.js";

async function reseed() {
  const uri = process.env.MONGODB_URI || "mongodb://31.97.23.227:27017/xanascript";
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collections = ["courses", "modulequizzes", "enrollments", "certificates", "quizattempts"];
    for (const name of collections) {
      const exists = await db.listCollections({ name }).toArray();
      if (exists.length > 0) {
        await db.collection(name).drop();
        console.log(`Dropped collection: ${name}`);
      }
    }

    await seedCoursePt();

    console.log("Reseed completed successfully!");
    process.exit(0);
  } catch (e) {
    console.error("Reseed failed:", e.message);
    process.exit(1);
  }
}

reseed();