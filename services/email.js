import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { enqueue } from "./emailQueue.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "..", "emails");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const SITE_URL = process.env.SITE_URL || "https://xanascript.xyz";
const FROM = `"XanaScript" <${process.env.EMAIL_USER}>`;

function renderTemplate(templateName, data) {
  const filePath = path.join(TEMPLATES_DIR, `${templateName}.ejs`);
  return ejs.renderFile(filePath, {
    ...data,
    siteUrl: SITE_URL,
  });
}

export async function sendMail(options) {
  try {
    await transporter.sendMail({ from: FROM, ...options });
    console.log("[email] Sent to", options.to);
  } catch (e) {
    console.error("[email] Failed to send to", options.to, ":", e.message);
    throw e;
  }
}

export async function sendVerificationEmail(email, username, token) {
  const html = await renderTemplate("verify-email", {
    username,
    link: `${SITE_URL}/api/auth/verify-email/${token}`,
  });
  enqueue(sendMail, { to: email, subject: "Verify your XanaScript account", html });
}

export async function sendPasswordResetEmail(email, username, token) {
  const html = await renderTemplate("reset-password", {
    username,
    link: `${SITE_URL}/reset-password/${token}`,
  });
  enqueue(sendMail, { to: email, subject: "Reset your XanaScript password", html });
}

export async function sendPackageApproved(email, username, pkgName, pkgVersion) {
  const html = await renderTemplate("package-approved", {
    username, packageName: pkgName, packageVersion: pkgVersion,
    link: `${SITE_URL}/packages/${pkgName}`,
  });
  enqueue(sendMail, { to: email, subject: `"${pkgName}" approved on XanaScript registry`, html });
}

export async function sendPackageRejected(email, username, pkgName, reason) {
  const html = await renderTemplate("package-rejected", {
    username, packageName: pkgName, reason: reason || null,
    dashboardLink: `${SITE_URL}/packages/dashboard`,
  });
  enqueue(sendMail, { to: email, subject: `"${pkgName}" was not approved`, html });
}

export async function send2FAEnabled(email, username) {
  const html = await renderTemplate("2fa-enabled", {
    username, resetLink: `${SITE_URL}/forgot-password`,
  });
  enqueue(sendMail, { to: email, subject: "Two-factor authentication enabled on your XanaScript account", html });
}

export async function send2FABackupCodes(email, username, codes) {
  const html = await renderTemplate("2fa-backup-codes", {
    username, codes, resetLink: `${SITE_URL}/forgot-password`,
  });
  enqueue(sendMail, { to: email, subject: "Your XanaScript 2FA backup codes", html });
}
