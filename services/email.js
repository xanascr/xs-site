import nodemailer from "nodemailer";

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

function baseTemplate(title, body) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<style>
  body { margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Helvetica,Arial,sans-serif; }
  .container { max-width:560px; margin:40px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.06); }
  .header { background:#f58b8e; padding:32px 40px 24px; text-align:center; }
  .header h1 { margin:0; color:#fff; font-size:24px; font-weight:800; letter-spacing:-0.03em; }
  .header p { margin:4px 0 0; color:rgba(255,255,255,0.85); font-size:14px; }
  .body { padding:32px 40px; color:#374151; font-size:15px; line-height:1.6; }
  .btn { display:inline-block; padding:12px 28px; background:#f58b8e; color:#fff !important; text-decoration:none; border-radius:12px; font-weight:700; font-size:15px; margin:16px 0; }
  .footer { padding:24px 40px; background:#f9fafb; text-align:center; font-size:12px; color:#9ca3af; }
  .footer a { color:#f58b8e; text-decoration:none; }
  hr { border:none; border-top:1px solid #e5e7eb; margin:20px 0; }
</style></head>
<body>
<div class="container">
  <div class="header"><h1>${title}</h1><p>XanaScript</p></div>
  <div class="body">${body}</div>
  <div class="footer">
    <p>XanaScript &mdash; <a href="${SITE_URL}">${SITE_URL}</a></p>
    <p style="margin:4px 0 0">This email was sent to you because of your activity on XanaScript.<br>If you did not request this, please ignore it.</p>
  </div>
</div>
</body>
</html>`;
}

export async function sendVerificationEmail(email, username, token) {
  const link = `${SITE_URL}/en/verify-email?token=${token}`;
  const body = `
    <p>Hi <strong>${username}</strong>,</p>
    <p>Thanks for signing up! Please verify your email address to activate your account.</p>
    <p style="text-align:center"><a class="btn" href="${link}">Verify Email</a></p>
    <p style="font-size:13px;color:#9ca3af">Or copy this link: <br>${link}</p>
    <hr>
    <p style="font-size:13px;color:#6b7280">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
  `;
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "Verify your XanaScript account",
    html: baseTemplate("Verify your email", body),
  });
}

export async function sendPasswordResetEmail(email, username, token) {
  const link = `${SITE_URL}/en/reset-password?token=${token}`;
  const body = `
    <p>Hi <strong>${username}</strong>,</p>
    <p>We received a request to reset your password. Click below to create a new one.</p>
    <p style="text-align:center"><a class="btn" href="${link}">Reset Password</a></p>
    <p style="font-size:13px;color:#9ca3af">Or copy this link: <br>${link}</p>
    <hr>
    <p style="font-size:13px;color:#6b7280">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
  `;
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "Reset your XanaScript password",
    html: baseTemplate("Password reset", body),
  });
}

export async function sendPackageApproved(email, username, pkgName, pkgVersion) {
  const link = `${SITE_URL}/en/packages/${pkgName}`;
  const body = `
    <p>Hi <strong>${username}</strong>,</p>
    <p>Your package <strong>${pkgName}@${pkgVersion}</strong> has been approved and published!</p>
    <p style="text-align:center"><a class="btn" href="${link}">View Package</a></p>
    <p>You can now install it with: <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px">xs install ${pkgName}</code></p>
  `;
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `"${pkgName}" approved on XanaScript registry`,
    html: baseTemplate("Package approved", body),
  });
}

export async function sendPackageRejected(email, username, pkgName, reason) {
  const body = `
    <p>Hi <strong>${username}</strong>,</p>
    <p>Your package <strong>${pkgName}</strong> was <strong>not approved</strong>.</p>
    ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
    <p>You can fix the issues and resubmit it from your dashboard.</p>
    <p style="text-align:center"><a class="btn" href="${SITE_URL}/en/packages/dashboard">Dashboard</a></p>
  `;
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `"${pkgName}" was not approved`,
    html: baseTemplate("Package status update", body),
  });
}
