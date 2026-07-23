import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  rules: { type: String, default: "" },
  prize: { type: String, default: "" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const submissionSchema = new mongoose.Schema({
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  link: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

hackathonSchema.index({ active: 1 });

export const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export const HackathonSubmission = mongoose.model("HackathonSubmission", submissionSchema);
