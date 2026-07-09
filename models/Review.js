import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, default: "", maxlength: 120 },
  body: { type: String, default: "", maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

reviewSchema.index({ packageId: 1, userId: 1 }, { unique: true });
reviewSchema.index({ packageId: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);