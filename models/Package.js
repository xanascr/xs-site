import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
  version: { type: String, required: true },
  description: { type: String, default: "" },
  license: { type: String, default: "MIT" },
  repository: { type: String, default: "" },
  keywords: [String],
  readme: { type: String, default: "" },
  filePath: { type: String, default: null },
  fileSize: { type: Number, default: 0 },
  dependencies: [String],
  createdAt: { type: Date, default: Date.now },
});

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9_-]+$/ },
  description: { type: String, default: "" },
  license: { type: String, default: "MIT" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repository: { type: String, default: "" },
  keywords: [String],
  readme: { type: String, default: "", maxlength: 100000 },
  downloads: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  reviewNotes: { type: String, default: "" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  reviewedAt: { type: Date, default: null },
  version: { type: String, default: "1.0.0" },
  versions: [versionSchema],
}, { timestamps: true });

packageSchema.index({ status: 1 });
packageSchema.index({ author: 1 });
packageSchema.index({ name: "text", description: "text", keywords: "text" });

export default mongoose.model("Package", packageSchema);
