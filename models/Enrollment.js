import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ lessonSlug: String, completedAt: Date }],
  quizPassed: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 },
  quizTotal: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
}, { timestamps: true });

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
