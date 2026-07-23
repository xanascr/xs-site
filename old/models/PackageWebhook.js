import mongoose from "mongoose";

const packageWebhookSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  email: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

packageWebhookSchema.index({ packageId: 1, email: 1 }, { unique: true });

export default mongoose.model("PackageWebhook", packageWebhookSchema);