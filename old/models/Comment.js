import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonSlug: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  body: { type: String, required: true, maxlength: 2000 },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

commentSchema.index({ courseId: 1, lessonSlug: 1, createdAt: -1 });

export default mongoose.model("Comment", commentSchema);