import mongoose from "mongoose";
import crypto from "crypto";

const certificateSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  courseName: { type: String, required: true },
  status: { type: String, enum: ["pending", "issued"], default: "pending" },
  points: { type: Number, default: 0 },
  issuedAt: Date,
  emailedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

certificateSchema.index({ code: 1 }, { unique: true });
certificateSchema.index({ userId: 1 });
certificateSchema.index({ status: 1 });

certificateSchema.statics.generateCode = function () {
  return "XS-" + crypto.randomBytes(4).toString("hex").toUpperCase() + "-" + crypto.randomBytes(2).toString("hex").toUpperCase();
};

export default mongoose.model("Certificate", certificateSchema);
