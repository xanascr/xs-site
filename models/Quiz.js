import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  moduleSlug: { type: String, required: true },
  title: { type: String, default: "" },
  questions: [{
    question: { type: String, required: true },
    options: [String],
    answer: { type: String, required: true },
    points: { type: Number, default: 5 },
  }],
  published: { type: Boolean, default: true },
}, { timestamps: true });

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  passed: { type: Boolean, required: true },
}, { timestamps: true });

export const Quiz = mongoose.model("Quiz", quizSchema);
export const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
