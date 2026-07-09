import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  bodyHtml: { type: String, default: "" },
  bodyMd: { type: String, default: "" },
  order: { type: Number, required: true },
  points: { type: Number, default: 10 },
  challenges: [{
    question: { type: String, required: true },
    type: { type: String, enum: ["multiple", "code", "text"], default: "text" },
    options: [String],
    answer: { type: String, required: true },
    points: { type: Number, default: 5 },
  }],
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  lang: { type: String, enum: ["en", "pt", "es"], default: "en" },
  category: { type: String, default: "beginner" },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  duration: { type: String, default: "2h" },
  totalPoints: { type: Number, default: 0 },
  published: { type: Boolean, default: false },
  lessons: [lessonSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

courseSchema.index({ published: 1 });

courseSchema.pre("save", function (next) {
  this.totalPoints = this.lessons.reduce((sum, l) => sum + l.points + l.challenges.reduce((s, c) => s + c.points, 0), 0);
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Course", courseSchema);
