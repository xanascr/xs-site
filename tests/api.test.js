import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { hashToken } from "../services/apiKey.js";

// ─── Environment setup (vi.hoisted runs before imports in ESM) ───
vi.hoisted(() => {
  process.env.JWT_SECRET = "test-jwt-secret";
  process.env.NODE_ENV = "test";
  process.env.SEAWEEDFS_VOLUME = "http://localhost:1";
});

// ─── Module mocks ───
vi.mock("axios", () => ({
  default: { get: vi.fn().mockResolvedValue({ data: { downloads: 1000 } }) },
  get: vi.fn().mockResolvedValue({ data: { downloads: 1000 } }),
}));

function makeS3Mock() {
  const mockRes = {
    statusCode: 200,
    on(event, cb) {
      if (event === "data") cb(Buffer.from(""));
      if (event === "end") cb();
      return this;
    },
  };
  function createReq(options, cb) {
    process.nextTick(() => cb(mockRes));
    return { on: vi.fn(), write: vi.fn(), end: vi.fn() };
  }
  return {
    default: { request: vi.fn(createReq) },
    request: vi.fn(createReq),
  };
}

vi.mock("https", () => makeS3Mock());
vi.mock("http", () => makeS3Mock());

vi.mock("../services/twoFactor.js", () => ({
  generateSecret: vi.fn(() => ({ secret: "TESTBASE32SECRET", otpauth: "otpauth://totp/test" })),
  verifyToken: vi.fn(),
  generateBackupCodes: vi.fn(() => ["CODE1-AAAA", "CODE2-BBBB", "CODE3-CCCC"]),
  verifyBackupCode: vi.fn(),
  hashBackupCodes: vi.fn(codes => codes.map(c => `hashed_${c}`)),
  generateToken: vi.fn(() => "123456"),
}));

vi.mock("../services/email.js", () => ({
  sendVerificationEmail: vi.fn().mockResolvedValue(),
  sendPasswordResetEmail: vi.fn().mockResolvedValue(),
  sendPackageApproved: vi.fn().mockResolvedValue(),
  sendPackageRejected: vi.fn().mockResolvedValue(),
  send2FAEnabled: vi.fn().mockResolvedValue(),
  send2FABackupCodes: vi.fn().mockResolvedValue(),
}));

vi.mock("express-rate-limit", () => ({
  default: () => (req, res, next) => next(),
}));

vi.mock("redis", () => ({
  createClient: vi.fn(() => ({
    connect: vi.fn().mockResolvedValue(),
    get: vi.fn().mockResolvedValue(null),
    setEx: vi.fn().mockResolvedValue(),
    del: vi.fn().mockResolvedValue(),
    on: vi.fn(),
    quit: vi.fn().mockResolvedValue(),
  })),
}));

vi.mock("../models/User.js", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    updateOne: vi.fn(),
  },
}));

vi.mock("../models/Package.js", () => ({
  default: {
    find: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    create: vi.fn(),
    updateOne: vi.fn(),
    countDocuments: vi.fn().mockResolvedValue(0),
  },
}));

// ─── Imports (after mocks) ───
import User from "../models/User.js";
import Package from "../models/Package.js";
import app from "../app.js";

// ─── Helpers ───

const JWT_SECRET = "test-jwt-secret";

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function regularToken() {
  return createToken({ id: "user1", username: "testuser", role: "user" });
}

function adminToken() {
  return createToken({ id: "admin1", username: "admin", role: "admin" });
}

function otherUserToken() {
  return createToken({ id: "user2", username: "otheruser", role: "user" });
}

function makeQuery(result) {
  const q = {
    select: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    skip: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    lean: vi.fn().mockReturnThis(),
    populate: vi.fn().mockReturnThis(),
    then: vi.fn((resolve) => {
      resolve(result);
      return { catch: vi.fn() };
    }),
    catch: vi.fn(),
  };
  return q;
}

function makeUser(overrides = {}) {
  return {
    _id: "user1",
    username: "testuser",
    email: "test@example.com",
    password: "$2a$12$fakehash",
    role: "user",
    emailVerified: true,
    twoFactorEnabled: false,
    twoFactorSecret: null,
    twoFactorBackupCodes: [],
    toPublic() {
      return {
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
        emailVerified: this.emailVerified,
        twoFactorEnabled: this.twoFactorEnabled,
      };
    },
    comparePassword: vi.fn(),
    tokenVersion: 0,
    save: vi.fn(),
    ...overrides,
  };
}

function makePackage(overrides = {}) {
  return {
    _id: "pkg1",
    name: "test-package",
    description: "A test package",
    version: "1.0.0",
    license: "MIT",
    author: "testuser",
    repository: "",
    keywords: [],
    readme: "",
    downloads: 0,
    s3Key: null,
    fileSize: 0,
    status: "pending",
    authorId: "user1",
    reviewNotes: "",
    reviewedBy: null,
    reviewedAt: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    save: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ═══════════════════════════════════════════════════════
//  Auth Endpoints
// ═══════════════════════════════════════════════════════

describe("POST /api/auth/signup", () => {
  it("creates a user and returns a token", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockImplementation((data) => {
      const user = makeUser({ username: data.username, email: data.email });
      user.generateVerificationToken = vi.fn().mockReturnValue("test-verification-token");
      user.save = vi.fn().mockResolvedValue();
      return Promise.resolve(user);
    });

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "newuser", email: "new@example.com", password: "password123", privacyConsent: true });

    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe("newuser");
    expect(res.body.user.email).toBe("new@example.com");
    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ username: "newuser" }, { email: "new@example.com" }],
    });
    expect(User.create).toHaveBeenCalledWith({
      username: "newuser",
      email: "new@example.com",
      password: "password123",
      privacyConsent: true,
      privacyConsentAt: expect.any(Date),
    });
  });

  it("returns 409 when username or email already taken", async () => {
    User.findOne.mockResolvedValue(makeUser());

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "testuser", email: "test@example.com", password: "password123", privacyConsent: true });

    expect(res.status).toBe(409);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/already taken/i);
    expect(User.create).not.toHaveBeenCalled();
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "incomplete" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/required/i);
  });

  it("returns 400 when password is too short", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "user", email: "u@example.com", password: "short" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/at least 8 characters/i);
  });
});

describe("POST /api/auth/login", () => {
  it("logs in with valid credentials", async () => {
    const user = makeUser();
    user.comparePassword.mockResolvedValue(true);
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe("testuser");
  });

  it("returns 401 with wrong password", async () => {
    const user = makeUser();
    user.comparePassword.mockResolvedValue(false);
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it("returns 401 for nonexistent user", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "ghost", password: "password123" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "onlyuser" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/required/i);
  });

  it("returns 403 when email is not verified", async () => {
    const user = makeUser({ emailVerified: false });
    user.comparePassword.mockResolvedValue(true);
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res.status).toBe(403);
    expect(res.body.ok).toBe(false);
    expect(res.body.emailNotVerified).toBe(true);
  });

  it("returns require2fa when 2FA is enabled", async () => {
    const user = makeUser({ twoFactorEnabled: true, twoFactorSecret: "secret" });
    user.comparePassword.mockResolvedValue(true);
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.require2fa).toBe(true);
    expect(res.body.tempToken).toBeDefined();
    expect(res.body.token).toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════
//  2FA Flow
// ═══════════════════════════════════════════════════════

import { verifyToken as mockVerifyToken } from "../services/twoFactor.js";

describe("POST /api/auth/2fa/verify", () => {
  it("completes login with a valid TOTP code", async () => {
    const user = makeUser({ twoFactorEnabled: true, twoFactorSecret: "secret" });
    User.findById.mockReturnValue(makeQuery(user));
    mockVerifyToken.mockResolvedValue(true);

    const tempToken = jwt.sign({ id: "user1", purpose: "2fa" }, JWT_SECRET, { expiresIn: "5m" });

    const res = await request(app)
      .post("/api/auth/2fa/verify")
      .send({ tempToken, code: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  it("returns 401 with an invalid TOTP code", async () => {
    const user = makeUser({ twoFactorEnabled: true, twoFactorSecret: "secret" });
    User.findById.mockReturnValue(makeQuery(user));
    mockVerifyToken.mockResolvedValue(false);

    const tempToken = jwt.sign({ id: "user1", purpose: "2fa" }, JWT_SECRET, { expiresIn: "5m" });

    const res = await request(app)
      .post("/api/auth/2fa/verify")
      .send({ tempToken, code: "000000" });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/2fa/verify")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });
});

describe("POST /api/auth/2fa/setup", () => {
  it("generates a 2FA secret for authenticated user", async () => {
    const user = makeUser();
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .post("/api/auth/2fa/setup")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.secret).toBeDefined();
    expect(res.body.otpauth).toBeDefined();
  });

  it("returns 401 without auth", async () => {
    const res = await request(app).post("/api/auth/2fa/setup");
    expect(res.status).toBe(401);
  });
});

describe("POST /api/auth/2fa/confirm", () => {
  it("enables 2FA with valid code", async () => {
    const user = makeUser({ twoFactorSecret: "secret" });
    user.twoFactorEnabled = false;
    user.save = vi.fn().mockResolvedValue();
    User.findById.mockReturnValue(makeQuery(user));
    mockVerifyToken.mockResolvedValue(true);

    const res = await request(app)
      .post("/api/auth/2fa/confirm")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ code: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.backupCodes).toBeDefined();
  });

  it("returns 401 with invalid code", async () => {
    const user = makeUser({ twoFactorSecret: "secret" });
    user.twoFactorEnabled = false;
    User.findById.mockReturnValue(makeQuery(user));
    mockVerifyToken.mockResolvedValue(false);

    const res = await request(app)
      .post("/api/auth/2fa/confirm")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ code: "000000" });

    expect(res.status).toBe(401);
  });
});

describe("GET /api/auth/me", () => {
  it("returns the current user with a valid token", async () => {
    const user = makeUser();
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.user.username).toBe("testuser");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("returns 401 without a token", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/missing token/i);
  });

  it("returns 401 with an invalid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer bogus-token");

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/invalid|expired/i);
  });

  it("returns 401 when the user no longer exists (token revoked)", async () => {
    User.findById.mockReturnValue(makeQuery(null));

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/revoked/i);
  });
});

// ═══════════════════════════════════════════════════════
//  Email Verification & Password Reset
// ═══════════════════════════════════════════════════════

describe("POST /api/auth/verify-email", () => {
  it("verifies email with a valid token", async () => {
    const user = makeUser({ emailVerified: false, emailVerificationToken: "valid-token", emailVerificationExpires: new Date(Date.now() + 3600000) });
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({ token: "valid-token" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(user.emailVerified).toBe(true);
    expect(user.save).toHaveBeenCalled();
  });

  it("returns 400 with an invalid token", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({ token: "bogus" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid|expired/i);
  });

  it("returns 400 without a token", async () => {
    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/token required/i);
  });
});

describe("POST /api/auth/forgot-password", () => {
  it("returns success regardless of whether email exists", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "nonexistent@test.com" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("generates reset token when user exists", async () => {
    const user = makeUser();
    user.generateResetToken = vi.fn().mockReturnValue("reset-token");
    user.save = vi.fn().mockResolvedValue();
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(user.generateResetToken).toHaveBeenCalled();
    expect(user.save).toHaveBeenCalled();
  });

  it("returns 400 without email", async () => {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email required/i);
  });
});

describe("POST /api/auth/reset-password", () => {
  it("resets password with valid token", async () => {
    const user = makeUser({ resetPasswordToken: "valid-reset-token", resetPasswordExpires: new Date(Date.now() + 3600000) });
    user.password = "oldhash";
    user.save = vi.fn().mockResolvedValue();
    User.findOne.mockResolvedValue(user);

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token: "valid-reset-token", password: "newpassword123" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(user.password).toBe("newpassword123");
    expect(user.resetPasswordToken).toBeNull();
    expect(user.resetPasswordExpires).toBeNull();
    expect(user.tokenVersion).toBe(1);
  });

  it("returns 400 with expired token", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token: "expired-token", password: "newpassword123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid|expired/i);
  });

  it("returns 400 with short password", async () => {
    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token: "some-token", password: "short" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/at least 8/i);
  });
});

// ═══════════════════════════════════════════════════════
//  API Key Management
// ═══════════════════════════════════════════════════════

describe("POST /api/auth/api-keys", () => {
  beforeEach(() => {
    User.findById.mockReturnValue(makeQuery(makeUser()));
  });

  it("creates an API key for admin user", async () => {
    const user = makeUser({ role: "admin", apiKeys: [] });
    user.save = vi.fn().mockResolvedValue();
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .post("/api/auth/api-keys")
      .set("Authorization", `Bearer ${adminToken()}`)
      .send({ name: "My Test Key" });

    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.key.token).toMatch(/^xs_/);
    expect(res.body.key.name).toBe("My Test Key");
  });

  it("returns 400 when name is too long", async () => {
    const res = await request(app)
      .post("/api/auth/api-keys")
      .set("Authorization", `Bearer ${adminToken()}`)
      .send({ name: "x".repeat(65) });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/1-64 chars/i);
  });

  it("returns 403 for non-admin users", async () => {
    const res = await request(app)
      .post("/api/auth/api-keys")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ name: "my key" });

    expect(res.status).toBe(403);
  });
});

describe("GET /api/auth/api-keys", () => {
  it("lists API keys for admin user", async () => {
    const user = makeUser({
      role: "admin",
      apiKeys: [
        { _id: "key1", name: "CI/CD", prefix: "xs_abc123", createdAt: new Date(), lastUsedAt: null },
      ],
    });
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .get("/api/auth/api-keys")
      .set("Authorization", `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.keys).toHaveLength(1);
    expect(res.body.keys[0].name).toBe("CI/CD");
  });
});

describe("DELETE /api/auth/api-keys/:id", () => {
  it("revokes an API key", async () => {
    const user = makeUser({
      role: "admin",
      apiKeys: [
        { _id: "key1", name: "CI/CD", prefix: "xs_abc123", createdAt: new Date() },
      ],
    });
    user.save = vi.fn().mockResolvedValue();
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .delete("/api/auth/api-keys/key1")
      .set("Authorization", `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(user.apiKeys).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════
//  tokenVersion Revocation
// ═══════════════════════════════════════════════════════

describe("tokenVersion revocation", () => {
  it("returns 401 after tokenVersion is incremented (password change)", async () => {
    // Token was issued when tokenVersion was 0
    const user = makeUser({ tokenVersion: 1 }); // Now tokenVersion is 1 (different from JWT)
    User.findById.mockReturnValue(makeQuery(user));

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/revoked/i);
  });
});

// ═══════════════════════════════════════════════════════
//  Tarball Size Limit
// ═══════════════════════════════════════════════════════

describe("POST /api/packages size limit", () => {
  beforeEach(() => {
    User.findById.mockReturnValue(makeQuery(makeUser()));
  });

  it("rejects tarball larger than 5MB", async () => {
    Package.findOne.mockResolvedValue(null);
    const oversized = Buffer.alloc(6 * 1024 * 1024); // 6MB (over multer limit)

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .field("name", "oversized-pkg")
      .field("version", "1.0.0")
      .attach("file", oversized, "oversized-pkg-1.0.0.tar.gz");

    expect(res.status).toBe(400); // multer rejects before handler
    expect(Package.create).not.toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════
//  Package CRUD
// ═══════════════════════════════════════════════════════

describe("POST /api/packages", () => {
  beforeEach(() => {
    User.findById.mockReturnValue(makeQuery(makeUser()));
  });

  it("submits a new package (authenticated)", async () => {
    Package.findOne.mockResolvedValue(null);
    Package.create.mockResolvedValue(makePackage({ name: "my-pkg" }));

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({
        name: "my-pkg",
        version: "1.0.0",
        description: "My awesome package",
        keywords: ["utility", "xs"],
      });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.message).toMatch(/submitted for review/i);
    expect(Package.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "my-pkg",
        version: "1.0.0",
        description: "My awesome package",
        author: "testuser",
      })
    );
  });

  it("returns 401 without authentication", async () => {
    const res = await request(app)
      .post("/api/packages")
      .send({ name: "no-auth-pkg", version: "1.0.0" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  it("returns 400 with invalid package name", async () => {
    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ name: "INVALID NAME!", version: "1.0.0" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/invalid package name/i);
  });

  it("returns 400 with invalid semver version", async () => {
    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ name: "valid-name", version: "not-a-version" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/invalid semver/i);
  });

  it("updates an existing package owned by the same user", async () => {
    const existingPkg = makePackage({ name: "existing-pkg", authorId: "user1" });
    Package.findOne.mockResolvedValue(existingPkg);

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ name: "existing-pkg", version: "2.0.0", description: "Updated desc" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(existingPkg.version).toBe("2.0.0");
    expect(existingPkg.description).toBe("Updated desc");
    expect(existingPkg.save).toHaveBeenCalled();
  });

  it("returns 403 when updating a package owned by another user", async () => {
    const existingPkg = makePackage({
      name: "other-owners-pkg",
      authorId: "user-owner",
      save: vi.fn(),
    });
    Package.findOne.mockResolvedValue(existingPkg);

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ name: "other-owners-pkg", version: "1.0.0" });

    expect(res.status).toBe(403);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/do not own/i);
  });

  it("submits a package with a file attachment", async () => {
    Package.findOne.mockResolvedValue(null);
    Package.create.mockResolvedValue(makePackage({ name: "file-pkg" }));

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${regularToken()}`)
      .field("name", "file-pkg")
      .field("version", "1.0.0")
      .attach("file", Buffer.from("fake-tarball"), "file-pkg-1.0.0.tar.gz");

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Package.create).toHaveBeenCalled();
  });
});

describe("GET /api/packages", () => {
  it("lists approved packages", async () => {
    const packages = [
      makePackage({ name: "pkg-a", status: "approved", downloads: 50 }),
      makePackage({ name: "pkg-b", status: "approved", downloads: 10 }),
    ];
    Package.find.mockReturnValue(makeQuery(packages));

    const res = await request(app).get("/api/packages");

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.packages).toHaveLength(2);
    expect(Package.find).toHaveBeenCalledWith({ status: "approved" });
  });

  it("searches packages by text query", async () => {
    const packages = [makePackage({ name: "result-pkg", status: "approved" })];
    Package.find.mockReturnValue(makeQuery(packages));

    const res = await request(app).get("/api/packages?q=test");

    expect(res.status).toBe(200);
    expect(res.body.packages).toHaveLength(1);
    expect(Package.find).toHaveBeenCalledWith({
      status: "approved",
      $text: { $search: "test" },
    });
  });
});

describe("GET /api/packages/:name", () => {
  it("returns a specific package", async () => {
    const pkg = makePackage({ name: "my-pkg", status: "approved" });
    Package.findOne.mockReturnValue(makeQuery(pkg));

    const res = await request(app).get("/api/packages/my-pkg");

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.package.name).toBe("my-pkg");
  });

  it("returns 404 for a nonexistent package", async () => {
    Package.findOne.mockReturnValue(makeQuery(null));

    const res = await request(app).get("/api/packages/ghost");

    expect(res.status).toBe(404);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toBe("not found");
  });
});

describe("POST /api/packages/:name/download", () => {
  it("increments the download counter and returns tarball", async () => {
    const pkg = makePackage({ name: "dl-pkg", status: "approved", downloads: 5 });
    Package.findOne.mockResolvedValue(pkg);
    Package.updateOne.mockResolvedValue({ acknowledged: true });

    const res = await request(app).post("/api/packages/dl-pkg/download");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("application/gzip");
    expect(Package.updateOne).toHaveBeenCalledWith(
      { _id: "pkg1" },
      { $inc: { downloads: 1 } }
    );
  });

  it("returns 404 for a nonexistent package", async () => {
    Package.findOne.mockResolvedValue(null);

    const res = await request(app).post("/api/packages/nope/download");

    expect(res.status).toBe(404);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/not found|not yet approved/i);
  });

  it("returns 404 when the package is not approved", async () => {
    Package.findOne.mockResolvedValue(null);

    const res = await request(app).post("/api/packages/pending-pkg/download");

    expect(res.status).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════
//  Admin Endpoints
// ═══════════════════════════════════════════════════════

describe("GET /api/admin/packages", () => {
  it("lists pending packages for admin", async () => {
    const packages = [
      makePackage({ name: "pending-pkg", status: "pending", authorId: "user1" }),
    ];
    Package.find.mockReturnValue(makeQuery(packages));

    const res = await request(app)
      .get("/api/admin/packages")
      .set("Authorization", `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.packages).toHaveLength(1);
    expect(Package.find).toHaveBeenCalledWith({ status: "pending" });
  });

  it("returns 403 for non-admin users", async () => {
    const res = await request(app)
      .get("/api/admin/packages")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(403);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/admin only/i);
  });

  it("returns 401 without any token", async () => {
    const res = await request(app).get("/api/admin/packages");

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });
});

function mockFindOneAndUpdate(result) {
  const populate = vi.fn().mockResolvedValue(result);
  const query = { populate };
  Package.findOneAndUpdate.mockReturnValue(query);
  return query;
}

describe("POST /api/admin/packages/:name/approve", () => {
  it("approves a pending package", async () => {
    const approved = makePackage({
      name: "pending-pkg",
      status: "approved",
      reviewedBy: "admin1",
      authorId: { _id: "user1", username: "testuser", email: "test@example.com" },
    });
    mockFindOneAndUpdate(approved);

    const res = await request(app)
      .post("/api/admin/packages/pending-pkg/approve")
      .set("Authorization", `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.package.status).toBe("approved");
    expect(Package.findOneAndUpdate).toHaveBeenCalledWith(
      { name: "pending-pkg", status: "pending" },
      expect.objectContaining({ status: "approved", reviewedBy: "admin1" }),
      { new: true }
    );
  });

  it("returns 403 for non-admin users", async () => {
    const res = await request(app)
      .post("/api/admin/packages/some-pkg/approve")
      .set("Authorization", `Bearer ${regularToken()}`);

    expect(res.status).toBe(403);
  });

  it("returns 404 when pending package not found", async () => {
    mockFindOneAndUpdate(null);

    const res = await request(app)
      .post("/api/admin/packages/missing/approve")
      .set("Authorization", `Bearer ${adminToken()}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /api/admin/packages/:name/reject", () => {
  it("rejects a pending package with a reason", async () => {
    const rejected = makePackage({
      name: "bad-pkg",
      status: "rejected",
      reviewNotes: "Violates guidelines",
      reviewedBy: "admin1",
      authorId: { _id: "user1", username: "testuser", email: "test@example.com" },
    });
    mockFindOneAndUpdate(rejected);

    const res = await request(app)
      .post("/api/admin/packages/bad-pkg/reject")
      .set("Authorization", `Bearer ${adminToken()}`)
      .send({ reason: "Violates guidelines" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.package.status).toBe("rejected");
    expect(res.body.package.reviewNotes).toBe("Violates guidelines");
  });

  it("rejects a pending package without a reason (empty string)", async () => {
    const rejected = makePackage({
      name: "no-reason-pkg",
      status: "rejected",
      reviewNotes: "",
      reviewedBy: "admin1",
      authorId: { _id: "user1", username: "testuser", email: "test@example.com" },
    });
    mockFindOneAndUpdate(rejected);

    const res = await request(app)
      .post("/api/admin/packages/no-reason-pkg/reject")
      .set("Authorization", `Bearer ${adminToken()}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Package.findOneAndUpdate).toHaveBeenCalledWith(
      { name: "no-reason-pkg", status: "pending" },
      expect.objectContaining({ reviewNotes: "" }),
      { new: true }
    );
  });

  it("returns 403 for non-admin users", async () => {
    const res = await request(app)
      .post("/api/admin/packages/some-pkg/reject")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ reason: "No reason" });

    expect(res.status).toBe(403);
  });
});

// ═══════════════════════════════════════════════════════
//  Edge Cases
// ═══════════════════════════════════════════════════════

describe("Edge cases", () => {
  it("concurrent downloads both increment the counter", async () => {
    const pkg = makePackage({
      name: "concurrent-pkg",
      status: "approved",
      downloads: 0,
    });
    Package.findOne.mockResolvedValue(pkg);
    Package.updateOne.mockResolvedValue({ acknowledged: true });

    await Promise.all([
      request(app).post("/api/packages/concurrent-pkg/download"),
      request(app).post("/api/packages/concurrent-pkg/download"),
    ]);

    expect(Package.updateOne).toHaveBeenCalledTimes(2);
    expect(Package.updateOne).toHaveBeenCalledWith(
      { _id: "pkg1" },
      { $inc: { downloads: 1 } }
    );
  });

  it("a package with the same name cannot be submitted by a different user", async () => {
    const existingPkg = makePackage({
      name: "owned-pkg",
      authorId: "user1",
    });
    Package.findOne.mockResolvedValue(existingPkg);

    const res = await request(app)
      .post("/api/packages")
      .set("Authorization", `Bearer ${otherUserToken()}`)
      .send({ name: "owned-pkg", version: "1.0.0" });

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/do not own/i);
  });

  it("admin API key header grants access to admin endpoints", async () => {
    Package.find.mockReturnValue(makeQuery([]));
    User.findOne.mockReturnValue({
      select: () => Promise.resolve({
        _id: "admin1",
        username: "admin",
        email: "admin@test.com",
        role: "admin",
      }),
    });

    const res = await request(app)
      .get("/api/admin/packages")
      .set("x-api-key", "test-admin-api-key");

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("invalid admin API key is rejected", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/admin/packages")
      .set("x-api-key", "wrong-key");

    expect(res.status).toBe(401);
  });
});

// ═══════════════════════════════════════════════════════
//  Package Edit (PUT)
// ═══════════════════════════════════════════════════════

describe("PUT /api/packages/:name", () => {
  beforeEach(() => {
    User.findById.mockReturnValue(makeQuery(makeUser()));
  });

  it("updates package description", async () => {
    const pkg = makePackage({ name: "my-pkg", authorId: "user1" });
    Package.findOne.mockResolvedValue(pkg);

    const res = await request(app)
      .put("/api/packages/my-pkg")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ description: "Updated description" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(pkg.description).toBe("Updated description");
    expect(pkg.save).toHaveBeenCalled();
  });

  it("updates readme and re-sanitizes it", async () => {
    const pkg = makePackage({ name: "readme-pkg", authorId: "user1" });
    Package.findOne.mockResolvedValue(pkg);

    const res = await request(app)
      .put("/api/packages/readme-pkg")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ readme: "# Hello\nThis is **bold** and `code`" });

    expect(res.status).toBe(200);
    expect(pkg.readme).toBe("# Hello\nThis is **bold** and `code`");
    expect(pkg.readmeSanitized).toContain("<h1");
    expect(pkg.readmeSanitized).toContain("<strong>");
    expect(pkg.readmeSanitized).toContain("<code>");
    expect(pkg.save).toHaveBeenCalled();
  });

  it("updates multiple fields at once", async () => {
    const pkg = makePackage({ name: "multi-pkg", authorId: "user1" });
    Package.findOne.mockResolvedValue(pkg);

    const res = await request(app)
      .put("/api/packages/multi-pkg")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({
        license: "Apache-2.0",
        repository: "https://github.com/user/repo",
        keywords: ["a", "b", "c"],
      });

    expect(res.status).toBe(200);
    expect(pkg.license).toBe("Apache-2.0");
    expect(pkg.repository).toBe("https://github.com/user/repo");
    expect(pkg.keywords).toEqual(["a", "b", "c"]);
    expect(pkg.save).toHaveBeenCalled();
  });

  it("returns 403 when editing another user's package", async () => {
    const pkg = makePackage({ name: "others-pkg", authorId: "user-owner" });
    Package.findOne.mockResolvedValue(pkg);

    const res = await request(app)
      .put("/api/packages/others-pkg")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ description: "hacked" });

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/do not own/i);
    expect(pkg.save).not.toHaveBeenCalled();
  });

  it("returns 404 for nonexistent package", async () => {
    Package.findOne.mockResolvedValue(null);

    const res = await request(app)
      .put("/api/packages/ghost")
      .set("Authorization", `Bearer ${regularToken()}`)
      .send({ description: "nope" });

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it("returns 401 without auth", async () => {
    const res = await request(app)
      .put("/api/packages/any-pkg")
      .send({ description: "test" });

    expect(res.status).toBe(401);
  });
});
