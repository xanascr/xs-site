import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "🎖️" },
  earnedAt: { type: Date, default: Date.now },
});

badgeSchema.index({ userId: 1, slug: 1 }, { unique: true });

export default mongoose.model("Badge", badgeSchema);