import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonSlug: { type: String, required: true },
  body: { type: String, required: true, maxlength: 5000 },
}, { timestamps: true });

commentSchema.index({ course: 1, lessonSlug: 1 });
commentSchema.index({ user: 1 });

export default mongoose.model("Comment", commentSchema);
