import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST) return null;
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
  });
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const transport = getTransporter();
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@xanascript.xyz";
  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[email:dev] ${subject} -> ${to}\n${html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`);
      return { ok: true, dev: true };
    }
    return { ok: false, error: "SMTP não configurado" };
  }
  try {
    await transport.sendMail({ from, to, subject, html });
    return { ok: true };
  } catch (e) {
    console.error("[email] Falha ao enviar:", e.message);
    return { ok: false, error: e.message };
  }
}

export function baseUrl() {
  return process.env.SITE_URL || `http://localhost:${process.env.PORT || 3010}`;
}