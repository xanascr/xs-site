import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Auth Routes", () => {
  it("POST /api/auth/signup creates user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "newuser", email: "new@x.com", password: "123456" });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.username).toBe("newuser");
  });

  it("POST /api/auth/signup rejects duplicate", async () => {
    await request(app).post("/api/auth/signup").send({ username: "dupe", email: "dupe@x.com", password: "123456" });
    const res = await request(app).post("/api/auth/signup").send({ username: "dupe2", email: "dupe@x.com", password: "123456" });
    expect(res.status).toBe(409);
    expect(res.body.ok).toBe(false);
  });

  it("POST /api/auth/signup validates username format", async () => {
    const res = await request(app).post("/api/auth/signup").send({ username: "UPPERCASE", email: "up@x.com", password: "123456" });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  it("POST /api/auth/login with valid credentials", async () => {
    await request(app).post("/api/auth/signup").send({ username: "loginuser", email: "login@x.com", password: "123456" });
    const res = await request(app).post("/api/auth/login").send({ email: "login@x.com", password: "123456" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeTruthy();
  });

  it("POST /api/auth/login with wrong password", async () => {
    await request(app).post("/api/auth/signup").send({ username: "wrongpw", email: "wrong@x.com", password: "123456" });
    const res = await request(app).post("/api/auth/login").send({ email: "wrong@x.com", password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  it("GET /api/auth/me returns user", async () => {
    const signup = await request(app).post("/api/auth/signup").send({ username: "meuser", email: "me@x.com", password: "123456" });
    const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${signup.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe("meuser");
  });

  it("GET /api/auth/me without token returns 401", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("PUT /api/auth/me updates user", async () => {
    const signup = await request(app).post("/api/auth/signup").send({ username: "updateuser", email: "update@x.com", password: "123456" });
    const res = await request(app).put("/api/auth/me").set("Authorization", `Bearer ${signup.body.token}`).send({ username: "updated" });
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe("updated");
  });

  it("POST /api/auth/logout works", async () => {
    const signup = await request(app).post("/api/auth/signup").send({ username: "logoutuser", email: "logout@x.com", password: "123456" });
    const res = await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${signup.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("PUT /api/auth/password changes password", async () => {
    const signup = await request(app).post("/api/auth/signup").send({ username: "changepw", email: "pw@x.com", password: "123456" });
    const res = await request(app).put("/api/auth/password").set("Authorization", `Bearer ${signup.body.token}`).send({ currentPassword: "123456", newPassword: "654321" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    const login = await request(app).post("/api/auth/login").send({ email: "pw@x.com", password: "654321" });
    expect(login.status).toBe(200);
  });

  it("PUT /api/auth/password rejects wrong current", async () => {
    const signup = await request(app).post("/api/auth/signup").send({ username: "wrongpw2", email: "wpw@x.com", password: "123456" });
    const res = await request(app).put("/api/auth/password").set("Authorization", `Bearer ${signup.body.token}`).send({ currentPassword: "wrong", newPassword: "654321" });
    expect(res.status).toBe(400);
  });

  it("POST /api/auth/forgot-password works", async () => {
    await request(app).post("/api/auth/signup").send({ username: "forgot", email: "forgot@x.com", password: "123456" });
    const res = await request(app).post("/api/auth/forgot-password").send({ email: "forgot@x.com" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
