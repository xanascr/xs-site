import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, default: "", maxlength: 120 },
  body: { type: String, default: "", maxlength: 2000 },
}, { timestamps: true });

reviewSchema.index({ package: 1, user: 1 }, { unique: true });
reviewSchema.index({ package: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
