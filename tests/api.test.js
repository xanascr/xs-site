import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { Quiz } from "../models/Quiz.js";
import { Hackathon } from "../models/Hackathon.js";
import Package from "../models/Package.js";

async function createUserToken() {
  await User.create({ username: "apiuser", email: "api@x.com", password: "123456" });
  const res = await request(app).post("/api/auth/login").send({ email: "api@x.com", password: "123456" });
  return res.body.token;
}

describe("API Packages", () => {
  it("GET /api/packages returns empty list", async () => {
    const res = await request(app).get("/api/packages");
    expect(res.status).toBe(200);
    expect(res.body.packages).toEqual([]);
  });

  it("POST /api/packages creates package", async () => {
    const token = await createUserToken();
    const res = await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "my-pkg").field("description", "My package").field("version", "1.0.0");
    expect(res.status).toBe(201);
    expect(res.body.package.name).toBe("my-pkg");
    expect(res.body.package.status).toBe("pending");
  });

  it("POST /api/packages rejects duplicate name", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "dup-pkg").field("version", "1.0.0");
    const res = await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "dup-pkg").field("version", "1.0.1");
    expect(res.status).toBe(201);
    expect(res.body.package.versions).toHaveLength(2);
  });

  it("POST /api/packages rejects same version", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "dup-ver").field("version", "1.0.0");
    const res = await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "dup-ver").field("version", "1.0.0");
    expect(res.status).toBe(409);
  });

  it("POST /api/packages requires auth", async () => {
    const res = await request(app).post("/api/packages").send({ name: "no-auth", version: "1.0.0" });
    expect(res.status).toBe(401);
  });

  it("GET /api/packages/mine returns user packages", async () => {
    const token = await createUserToken();
    const res = await request(app).get("/api/packages/mine").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.packages).toEqual([]);
  });

  it("GET /api/packages/:name returns package", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "get-pkg").field("version", "1.0.0");
    await Package.findOneAndUpdate({ name: "get-pkg" }, { status: "approved" });
    const pkg = await request(app).get("/api/packages/get-pkg");
    expect(pkg.status).toBe(200);
    expect(pkg.body.package.name).toBe("get-pkg");
  });

  it("GET /api/packages/:name hides pending from anonymous", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "hidden-pkg").field("version", "1.0.0");
    const pkg = await request(app).get("/api/packages/hidden-pkg");
    expect(pkg.status).toBe(404);
  });
});

describe("API Courses", () => {
  it("GET /api/courses returns empty", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).toBe(200);
    expect(res.body.courses).toEqual([]);
  });

  it("GET /api/courses returns published", async () => {
    await Course.create({ title: "Pub", slug: "pub", published: true, level: "beginner" });
    await Course.create({ title: "Draft", slug: "draft", published: false, level: "beginner" });
    const res = await request(app).get("/api/courses");
    expect(res.body.courses).toHaveLength(1);
  });

  it("POST /:slug/enroll enrolls user", async () => {
    const token = await createUserToken();
    await Course.create({ title: "Enroll", slug: "enroll", published: true, level: "beginner" });
    const res = await request(app).post("/api/courses/enroll/enroll").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.enrollment).toBeDefined();
  });

  it("POST /:slug/enroll idempotent", async () => {
    const token = await createUserToken();
    await Course.create({ title: "Idem", slug: "idem", published: true, level: "beginner" });
    await request(app).post("/api/courses/idem/enroll").set("Authorization", `Bearer ${token}`);
    const res = await request(app).post("/api/courses/idem/enroll").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("POST /:slug/lessons/:lessonSlug/complete marks lesson", async () => {
    const token = await createUserToken();
    const course = await Course.create({
      title: "Complete", slug: "complete", published: true, level: "beginner",
      modules: [{ title: "M1", slug: "m1", order: 1, lessons: [{ slug: "l1", title: "L1", bodyMd: "# L1", order: 1, points: 10 }] }],
    });
    const res = await request(app).post("/api/courses/complete/lessons/l1/complete").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.enrollment.completedLessons).toHaveLength(1);
    expect(res.body.enrollment.completedLessons[0].lessonSlug).toBe("l1");
  });
});

describe("API Comments", () => {
  it("POST /:courseId/comments creates comment", async () => {
    const token = await createUserToken();
    const course = await Course.create({ title: "Comm", slug: "comm", published: true, level: "beginner" });
    const res = await request(app).post(`/api/courses/${course._id}/comments`).set("Authorization", `Bearer ${token}`).send({ lessonSlug: "l1", body: "Nice lesson!" });
    expect(res.status).toBe(201);
    expect(res.body.comment.body).toBe("Nice lesson!");
  });

  it("POST /:courseId/comments rejects empty", async () => {
    const token = await createUserToken();
    const course = await Course.create({ title: "Empty", slug: "empty", published: true, level: "beginner" });
    const res = await request(app).post(`/api/courses/${course._id}/comments`).set("Authorization", `Bearer ${token}`).send({ body: "" });
    expect(res.status).toBe(400);
  });

  it("GET /:courseId/comments lists comments", async () => {
    const token = await createUserToken();
    const course = await Course.create({ title: "ListC", slug: "listc", published: true, level: "beginner" });
    await request(app).post(`/api/courses/${course._id}/comments`).set("Authorization", `Bearer ${token}`).send({ lessonSlug: "l1", body: "First!" });
    const res = await request(app).get(`/api/courses/${course._id}/comments`);
    expect(res.status).toBe(200);
    expect(res.body.comments).toHaveLength(1);
  });
});

describe("API Hackathons", () => {
  it("GET /api/hackathons returns list", async () => {
    const res = await request(app).get("/api/hackathons");
    expect(res.status).toBe(200);
  });

  it("POST /:id/submit creates submission", async () => {
    const token = await createUserToken();
    const hack = await Hackathon.create({ title: "Live Hack", slug: "live", startDate: new Date(), endDate: new Date(Date.now() + 86400000), active: true });
    const res = await request(app).post(`/api/hackathons/${hack._id}/submit`).set("Authorization", `Bearer ${token}`).send({ title: "My Project", description: "Desc" });
    expect(res.status).toBe(201);
    expect(res.body.submission.title).toBe("My Project");
  });

  it("POST /:id/submit rejects duplicate", async () => {
    const token = await createUserToken();
    const hack = await Hackathon.create({ title: "Unique Hack", slug: "unique-hack", startDate: new Date(), endDate: new Date(Date.now() + 86400000), active: true });
    await request(app).post(`/api/hackathons/${hack._id}/submit`).set("Authorization", `Bearer ${token}`).send({ title: "First", description: "First" });
    const res = await request(app).post(`/api/hackathons/${hack._id}/submit`).set("Authorization", `Bearer ${token}`).send({ title: "Second", description: "Second" });
    expect(res.status).toBe(409);
  });

  it("POST /:id/submit rejects inactive", async () => {
    const token = await createUserToken();
    const hack = await Hackathon.create({ title: "Inactive", slug: "inactive", startDate: new Date(), endDate: new Date(), active: false });
    const res = await request(app).post(`/api/hackathons/${hack._id}/submit`).set("Authorization", `Bearer ${token}`).send({ title: "P", description: "D" });
    expect(res.status).toBe(400);
  });
});

describe("API Reviews", () => {
  it("GET /api/packages/:name/reviews returns empty", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "review-pkg").field("version", "1.0.0");
    const res = await request(app).get("/api/packages/review-pkg/reviews");
    expect(res.status).toBe(200);
    expect(res.body.reviews).toEqual([]);
    expect(res.body.avgRating).toBe(0);
  });

  it("POST /api/packages/:name/reviews creates review", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "review-pkg2").field("version", "1.0.0");
    await Package.findOneAndUpdate({ name: "review-pkg2" }, { status: "approved" });

    const res = await request(app).post("/api/packages/review-pkg2/reviews").set("Authorization", `Bearer ${token}`).send({ rating: 5, title: "Amazing!", body: "Best package ever" });
    expect(res.status).toBe(201);
    expect(res.body.review.rating).toBe(5);
    expect(res.body.review.title).toBe("Amazing!");
  });

  it("POST /api/packages/:name/reviews upserts", async () => {
    const token = await createUserToken();
    await request(app).post("/api/packages").set("Authorization", `Bearer ${token}`).field("name", "review-pkg3").field("version", "1.0.0");
    await Package.findOneAndUpdate({ name: "review-pkg3" }, { status: "approved" });

    await request(app).post("/api/packages/review-pkg3/reviews").set("Authorization", `Bearer ${token}`).send({ rating: 3 });
    const res = await request(app).post("/api/packages/review-pkg3/reviews").set("Authorization", `Bearer ${token}`).send({ rating: 4, title: "Updated" });
    expect(res.status).toBe(200);
    expect(res.body.review.rating).toBe(4);
  });
});

describe("API Quiz", () => {
  it("POST /:courseId/quiz/submit evaluates answers", async () => {
    const token = await createUserToken();
    const course = await Course.create({ title: "QuizC", slug: "quizc", published: true, level: "beginner" });
    const quiz = await Quiz.create({
      course: course._id, moduleSlug: "intro", title: "Test Quiz", published: true,
      questions: [
        { question: "Q1", options: ["A", "B"], answer: "A", points: 5 },
        { question: "Q2", options: ["C", "D"], answer: "D", points: 5 },
      ],
    });
    const res = await request(app).post(`/api/courses/${course._id}/quiz/submit`).set("Authorization", `Bearer ${token}`).send({ quizId: quiz._id, answers: ["A", "C"] });
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1);
    expect(res.body.total).toBe(2);
    expect(res.body.percent).toBe(50);
  });

  it("POST /:courseId/quiz/submit with all correct", async () => {
    const token = await createUserToken();
    const course = await Course.create({ title: "QuizC2", slug: "quizc2", published: true, level: "beginner" });
    const quiz = await Quiz.create({
      course: course._id, moduleSlug: "intro", title: "All Correct", published: true,
      questions: [{ question: "Q", options: ["A", "B"], answer: "A", points: 5 }],
    });
    const res = await request(app).post(`/api/courses/${course._id}/quiz/submit`).set("Authorization", `Bearer ${token}`).send({ quizId: quiz._id, answers: ["A"] });
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1);
    expect(res.body.percent).toBe(100);
  });
});
