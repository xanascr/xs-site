import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: "" },
  version: { type: String, default: "1.0.0" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  readme: { type: String, default: "" },
  downloads: { type: Number, default: 0 },
  approved: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
}, { timestamps: true });

packageSchema.index({ approved: 1, published: 1 });

export default mongoose.model("Package", packageSchema);
