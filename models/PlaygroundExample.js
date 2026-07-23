import mongoose from "mongoose";

const playgroundExampleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "general" },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("PlaygroundExample", playgroundExampleSchema);
