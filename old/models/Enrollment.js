import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  progress: [{
    lessonSlug: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: Date,
    challengesPassed: { type: Number, default: 0 },
  }],
  points: { type: Number, default: 0 },
  completedAt: Date,
  certificateEligible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
enrollmentSchema.index({ userId: 1 });

export default mongoose.model("Enrollment", enrollmentSchema);
