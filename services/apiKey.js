import crypto from "crypto";

const TOKEN_BYTES = 24;
const PREFIX_LEN = 8;

export function generateApiKey(name) {
  const raw = crypto.randomBytes(TOKEN_BYTES);
  const token = "xs_" + raw.toString("base64url");
  const prefix = token.slice(0, PREFIX_LEN);
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, prefix, hash };
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
