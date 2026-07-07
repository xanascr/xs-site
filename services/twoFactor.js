import crypto from "crypto";
import { authenticator } from "otplib";

const APP_NAME = "XanaScript";

export function generateSecret(username) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(username, APP_NAME, secret);
  return { secret, otpauth };
}

export function verifyToken(secret, token) {
  try {
    return authenticator.verify({ token, secret });
  } catch {
    return false;
  }
}

export function generateBackupCodes(count = 8) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(5).toString("hex").toUpperCase().match(/.{5}/g).join("-");
    codes.push(code);
  }
  return codes;
}

export function verifyBackupCode(code, hashedCodes) {
  const input = code.toUpperCase().trim();
  const inputHash = crypto.createHash("sha256").update(input).digest("hex");
  for (const hashed of hashedCodes) {
    if (crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(inputHash))) {
      return hashed;
    }
  }
  return null;
}

export function hashBackupCodes(codes) {
  return codes.map(c => crypto.createHash("sha256").update(c).digest("hex"));
}
