import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  bodyMd: { type: String, default: "" },
  order: { type: Number, required: true },
  points: { type: Number, default: 10 },
}, { _id: false });

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true },
  lessons: [lessonSchema],
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  published: { type: Boolean, default: false },
  modules: [moduleSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

courseSchema.index({ published: 1 });

export default mongoose.model("Course", courseSchema);
