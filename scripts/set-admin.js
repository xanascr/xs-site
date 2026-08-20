import mongoose from "mongoose";
import User from "../models/User.js";

async function setAdmin(username) {
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    console.error(`[set-admin] Usuário "${username}" não encontrado`);
    process.exit(1);
  }
  if (user.role === "admin") {
    console.log(`[set-admin] ${user.username} já é admin`);
  } else {
    user.role = "admin";
    user.tokenVersion += 1;
    await user.save();
    console.log(`[set-admin] ${user.username} promovido a admin (tokenVersion → ${user.tokenVersion})`);
  }
  process.exit(0);
}

const username = process.argv[2];
if (!username) {
  console.error("Uso: node scripts/set-admin.js <username>");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => setAdmin(username))
  .catch(e => { console.error(e); process.exit(1); });