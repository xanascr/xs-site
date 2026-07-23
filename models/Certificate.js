import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  code: { type: String, required: true, unique: true },
  issuedBy: { type: String, default: "auto" },
}, { timestamps: true });

certificateSchema.index({ user: 1, course: 1 });

export default mongoose.model("Certificate", certificateSchema);
