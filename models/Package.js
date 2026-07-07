import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9_-]+$/,
    },
    description: { type: String, default: "" },
    version: { type: String, required: true, default: "1.0.0" },
    license: { type: String, default: "MIT" },
    author: { type: String, default: "" },
    repository: { type: String, default: "" },
    keywords: [String],
    readme: { type: String, default: "" },
    downloads: { type: Number, default: 0 },
    s3Key: { type: String, default: null },
    fileSize: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewNotes: { type: String, default: "" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

packageSchema.index({ name: "text", description: "text", keywords: "text" });
packageSchema.index({ status: 1 });
packageSchema.index({ authorId: 1 });

export default mongoose.model("Package", packageSchema);
