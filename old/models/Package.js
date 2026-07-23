import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    version: { type: String, required: true },
    description: { type: String, default: "" },
    license: { type: String, default: "MIT" },
    repository: { type: String, default: "" },
    keywords: [String],
    readme: { type: String, default: "" },
    readmeSanitized: { type: String, default: "" },
    s3Key: { type: String, default: null },
    fileSize: { type: Number, default: 0 },
    dependencies: [String],
  },
  { timestamps: true }
);

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9_-]+$/,
    },
    // Latest version snapshot (synced from versions array)
    version: { type: String, required: true, default: "1.0.0" },
    description: { type: String, default: "" },
    license: { type: String, default: "MIT" },
    author: { type: String, default: "" },
    repository: { type: String, default: "" },
    keywords: [String],
    readme: { type: String, default: "" },
    readmeSanitized: { type: String, default: "" },
    downloads: { type: Number, default: 0 },
    s3Key: { type: String, default: null },
    fileSize: { type: Number, default: 0 },
    dependencies: [String],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewNotes: { type: String, default: "" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
    // Version history
    versions: [versionSchema],
  },
  { timestamps: true }
);

packageSchema.index({ name: "text", description: "text", keywords: "text" });
packageSchema.index({ status: 1 });
packageSchema.index({ authorId: 1 });

export default mongoose.model("Package", packageSchema);
