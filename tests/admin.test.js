import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";

async function createAdminToken() {
  await User.create({ username: "admin", email: "admin@x.com", password: "123456", role: "admin" });
  const res = await request(app).post("/api/auth/login").send({ email: "admin@x.com", password: "123456" });
  return res.body.token;
}

async function createUserToken() {
  await User.create({ username: "regular", email: "regular@x.com", password: "123456" });
  const res = await request(app).post("/api/auth/login").send({ email: "regular@x.com", password: "123456" });
  return res.body.token;
}

describe("Admin Routes", () => {
  it("GET /api/admin/stats returns counts", async () => {
    const token = await createAdminToken();
    const res = await request(app).get("/api/admin/stats").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.stats).toBeDefined();
    expect(typeof res.body.stats.users).toBe("number");
  });

  it("GET /api/admin/stats rejects non-admin", async () => {
    const token = await createUserToken();
    const res = await request(app).get("/api/admin/stats").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("GET /api/admin/stats rejects no token", async () => {
    const res = await request(app).get("/api/admin/stats");
    expect(res.status).toBe(401);
  });

  it("GET /api/admin/users lists users", async () => {
    const token = await createAdminToken();
    const res = await request(app).get("/api/admin/users").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.users.length).toBeGreaterThanOrEqual(1);
  });

  it("PATCH /api/admin/users/:id/role changes role", async () => {
    const adminToken = await createAdminToken();
    const userToken = await createUserToken();
    const user = await User.findOne({ username: "regular" });
    const res = await request(app).patch(`/api/admin/users/${user._id}/role`).set("Authorization", `Bearer ${adminToken}`).send({ role: "admin" });
    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe("admin");
  });

  it("PATCH /api/admin/users/:id/role rejects invalid role", async () => {
    const adminToken = await createAdminToken();
    const userToken = await createUserToken();
    const user = await User.findOne({ username: "regular" });
    const res = await request(app).patch(`/api/admin/users/${user._id}/role`).set("Authorization", `Bearer ${adminToken}`).send({ role: "superadmin" });
    expect(res.status).toBe(400);
  });

  it("CRUD courses", async () => {
    const token = await createAdminToken();

    const create = await request(app).post("/api/admin/courses").set("Authorization", `Bearer ${token}`).send({
      title: "New Course", slug: "new-course", description: "Desc", level: "beginner", published: false,
    });
    expect(create.status).toBe(201);
    const courseId = create.body.course._id;

    const list = await request(app).get("/api/admin/courses").set("Authorization", `Bearer ${token}`);
    expect(list.body.courses.length).toBeGreaterThanOrEqual(1);

    const update = await request(app).put(`/api/admin/courses/${courseId}`).set("Authorization", `Bearer ${token}`).send({ published: true });
    expect(update.status).toBe(200);
    expect(update.body.course.published).toBe(true);

    const del = await request(app).delete(`/api/admin/courses/${courseId}`).set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(200);
  });

  it("CRUD docs", async () => {
    const token = await createAdminToken();

    const create = await request(app).post("/api/admin/docs").set("Authorization", `Bearer ${token}`).send({
      title: "Doc 1", slug: "doc-1", category: "test", body: "# Doc", order: 1,
    });
    expect(create.status).toBe(201);
    const docId = create.body.doc._id;

    const list = await request(app).get("/api/admin/docs").set("Authorization", `Bearer ${token}`);
    expect(list.body.docs.length).toBeGreaterThanOrEqual(1);

    const update = await request(app).put(`/api/admin/docs/${docId}`).set("Authorization", `Bearer ${token}`).send({ title: "Updated Doc" });
    expect(update.status).toBe(200);
    expect(update.body.doc.title).toBe("Updated Doc");

    const del = await request(app).delete(`/api/admin/docs/${docId}`).set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(200);
  });

  it("CRUD playground examples", async () => {
    const token = await createAdminToken();

    const create = await request(app).post("/api/admin/playground-examples").set("Authorization", `Bearer ${token}`).send({
      title: "Ex1", slug: "ex1", code: 'print("hi")', category: "basico", order: 1,
    });
    expect(create.status).toBe(201);
    const exId = create.body.example._id;

    const list = await request(app).get("/api/admin/playground-examples").set("Authorization", `Bearer ${token}`);
    expect(list.body.examples.length).toBeGreaterThanOrEqual(1);

    const update = await request(app).put(`/api/admin/playground-examples/${exId}`).set("Authorization", `Bearer ${token}`).send({ title: "Ex1 Updated" });
    expect(update.status).toBe(200);
    expect(update.body.example.title).toBe("Ex1 Updated");

    const del = await request(app).delete(`/api/admin/playground-examples/${exId}`).set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(200);
  });

  it("CRUD hackathons", async () => {
    const token = await createAdminToken();

    const create = await request(app).post("/api/admin/hackathons").set("Authorization", `Bearer ${token}`).send({
      title: "Hack 1", slug: "hack-1", startDate: new Date().toISOString(), endDate: new Date(Date.now() + 86400000).toISOString(),
    });
    expect(create.status).toBe(201);
    const hackId = create.body.hackathon._id;

    const list = await request(app).get("/api/admin/hackathons").set("Authorization", `Bearer ${token}`);
    expect(list.body.hackathons.length).toBeGreaterThanOrEqual(1);
  });

  it("approve package", async () => {
    const adminToken = await createAdminToken();
    const userToken = await createUserToken();

    await request(app).post("/api/packages").set("Authorization", `Bearer ${userToken}`).field("name", "need-approve").field("description", "Needs approval").field("version", "1.0.0");

    const approve = await request(app).post("/api/admin/packages/need-approve/approve").set("Authorization", `Bearer ${adminToken}`);
    expect(approve.status).toBe(200);
    expect(approve.body.package.status).toBe("approved");
  });

  it("reject package", async () => {
    const adminToken = await createAdminToken();
    const userToken = await createUserToken();

    await request(app).post("/api/packages").set("Authorization", `Bearer ${userToken}`).field("name", "need-reject").field("description", "Bad pkg").field("version", "1.0.0");

    const reject = await request(app).post("/api/admin/packages/need-reject/reject").set("Authorization", `Bearer ${adminToken}`).send({ reason: "Código malicioso" });
    expect(reject.status).toBe(200);
    expect(reject.body.package.status).toBe("rejected");
    expect(reject.body.package.reviewNotes).toBe("Código malicioso");
  });
});
