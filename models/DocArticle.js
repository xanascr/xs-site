import mongoose from "mongoose";

const docArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  body: { type: String, default: "" },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

docArticleSchema.index({ category: 1, order: 1 });

export default mongoose.model("DocArticle", docArticleSchema);
