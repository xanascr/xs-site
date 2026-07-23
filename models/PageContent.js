import mongoose from "mongoose";

const pageContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("PageContent", pageContentSchema);
