import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { enqueue } from "./emailQueue.js";
import { BANNER_BASE64 } from "../emails/banner.js";

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
    bannerBase64: BANNER_BASE64,
    siteUrl: SITE_URL,
  });
}

async function sendMail(options) {
  await transporter.sendMail({ from: FROM, ...options });
}

export function sendVerificationEmail(email, username, token) {
  enqueue(sendMail, {
    to: email,
    subject: "Verify your XanaScript account",
    htmlPromise: renderTemplate("verify-email", {
      username,
      link: `${SITE_URL}/en/verify-email?token=${token}`,
    }),
  });
}

export function sendPasswordResetEmail(email, username, token) {
  enqueue(sendMail, {
    to: email,
    subject: "Reset your XanaScript password",
    htmlPromise: renderTemplate("reset-password", {
      username,
      link: `${SITE_URL}/en/reset-password?token=${token}`,
    }),
  });
}

export function sendPackageApproved(email, username, pkgName, pkgVersion) {
  enqueue(sendMail, {
    to: email,
    subject: `"${pkgName}" approved on XanaScript registry`,
    htmlPromise: renderTemplate("package-approved", {
      username,
      packageName: pkgName,
      packageVersion: pkgVersion,
      link: `${SITE_URL}/en/packages/${pkgName}`,
    }),
  });
}

export function sendPackageRejected(email, username, pkgName, reason) {
  enqueue(sendMail, {
    to: email,
    subject: `"${pkgName}" was not approved`,
    htmlPromise: renderTemplate("package-rejected", {
      username,
      packageName: pkgName,
      reason: reason || null,
      dashboardLink: `${SITE_URL}/en/packages/dashboard`,
    }),
  });
}

export function send2FAEnabled(email, username) {
  enqueue(sendMail, {
    to: email,
    subject: "Two-factor authentication enabled on your XanaScript account",
    htmlPromise: renderTemplate("2fa-enabled", {
      username,
      resetLink: `${SITE_URL}/en/forgot-password`,
    }),
  });
}

export function send2FABackupCodes(email, username, codes) {
  enqueue(sendMail, {
    to: email,
    subject: "Your XanaScript 2FA backup codes",
    htmlPromise: renderTemplate("2fa-backup-codes", {
      username,
      codes,
      resetLink: `${SITE_URL}/en/forgot-password`,
    }),
  });
}
