import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z0-9_-]+$/,
    },
    description: { type: String, default: "" },
    version: { type: String, required: true, default: "1.0.0" },
    license: { type: String, default: "MIT" },
    author: { type: String, default: "" },
    repository: { type: String, default: "" },
    keywords: [String],
    fid: { type: String, default: null },
    readme: { type: String, default: "" },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

packageSchema.index({ name: "text", description: "text", keywords: "text" });

export default mongoose.model("Package", packageSchema);
