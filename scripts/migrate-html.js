import mongoose from "mongoose";
import { marked } from "marked";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

async function migrate() {
  await mongoose.connect(MONGODB_URI);
  console.log("[migrate] Connected to MongoDB");

  const courses = await Course.find({ published: true }).lean();
  console.log(`[migrate] Found ${courses.length} course(s)`);

  for (const course of courses) {
    let changed = 0;
    for (const lesson of course.lessons) {
      if (lesson.bodyMd) {
        const clean = marked.parse(lesson.bodyMd, { async: false });
        if (clean !== lesson.bodyHtml) {
          await Course.updateOne(
            { _id: course._id, "lessons.slug": lesson.slug },
            { $set: { "lessons.$.bodyHtml": clean } }
          );
          changed++;
        }
      }
    }
    console.log(`[migrate] ${course.slug}: ${changed}/${course.lessons.length} lessons updated`);
  }

  console.log("[migrate] Done");
  await mongoose.disconnect();
}

migrate().catch(e => { console.error(e); process.exit(1); });