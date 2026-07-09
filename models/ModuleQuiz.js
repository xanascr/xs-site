import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ["multiple", "text"], default: "text" },
  options: [String],
  answer: { type: String, required: true },
  points: { type: Number, default: 10 },
}, { _id: false });

const moduleQuizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  moduleIndex: { type: Number, required: true },
  title: { type: String, required: true },
  questions: [questionSchema],
  lessonSlugs: [String],
  passingScore: { type: Number, default: 70 },
}, { timestamps: true });

moduleQuizSchema.index({ courseId: 1, moduleIndex: 1 }, { unique: true });

export default mongoose.model("ModuleQuiz", moduleQuizSchema);