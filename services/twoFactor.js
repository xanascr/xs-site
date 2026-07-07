import crypto from "crypto";

const APP_NAME = "XanaScript";

let _otplib = null;
async function getOtplib() {
  if (!_otplib) _otplib = await import("otplib/functional");
  return _otplib;
}

export async function generateSecret(username) {
  const { generateSecret: gs, generateURI } = await getOtplib();
  const secret = gs();
  const otpauth = generateURI({ issuer: APP_NAME, label: username, secret });
  return { secret, otpauth };
}

export async function verifyToken(secret, token) {
  try {
    const { verify } = await getOtplib();
    const result = await verify({ token, secret });
    return result.valid;
  } catch {
    return false;
  }
}

export async function generateToken(secret) {
  const { generate } = await getOtplib();
  return generate({ secret });
}

export function generateBackupCodes(count = 8) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const raw = crypto.randomBytes(5).toString("hex").toUpperCase();
    const code = raw.match(/.{5}/g).join("-");
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
