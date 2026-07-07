import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected");

  const email = process.env.SEED_EMAIL;
  const username = process.env.SEED_USERNAME || email?.split("@")[0] || "admin";
  const password = process.env.SEED_PASSWORD;
  const role = process.env.SEED_ROLE || "admin";

  if (!email || !password) {
    console.error("SEED_EMAIL and SEED_PASSWORD must be set in .env");
    process.exit(1);
  }

  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) {
    existing.role = role;
    existing.emailVerified = true;
    await existing.save();
    console.log(`User ${username} updated to role=${role}`);
  } else {
    await User.create({
      username,
      email,
      password,
      role,
      emailVerified: true,
      privacyConsent: true,
      privacyConsentAt: new Date(),
    });
    console.log(`User ${username} created with role=${role}`);
  }

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch(console.error);
