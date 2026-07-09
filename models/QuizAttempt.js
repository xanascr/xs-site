import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIdx: { type: Number, required: true },
  answer: String,
  correct: Boolean,
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "ModuleQuiz", required: true },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  earnedXp: { type: Number, default: 0 },
  passed: { type: Boolean, default: false },
  attemptNumber: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

quizAttemptSchema.index({ userId: 1, quizId: 1 });

export default mongoose.model("QuizAttempt", quizAttemptSchema);