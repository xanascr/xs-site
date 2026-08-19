import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const transport = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xanascript.xyz";
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