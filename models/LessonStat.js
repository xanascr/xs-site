import mongoose from "mongoose";

const lessonStatSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonSlug: { type: String, required: true },
  views: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  completions: { type: Number, default: 0 },
  abandonments: { type: Number, default: 0 },
  totalChallenges: { type: Number, default: 0 },
  passedChallenges: { type: Number, default: 0 },
});

lessonStatSchema.index({ courseId: 1, lessonSlug: 1 }, { unique: true });

export default mongoose.model("LessonStat", lessonStatSchema);