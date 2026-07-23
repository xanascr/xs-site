import { describe, it, expect } from "vitest";
import User from "../models/User.js";
import Course from "../models/Course.js";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import Review from "../models/Review.js";
import { Hackathon, HackathonSubmission } from "../models/Hackathon.js";
import Package from "../models/Package.js";
import Comment from "../models/Comment.js";
import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";
import { Quiz, QuizAttempt } from "../models/Quiz.js";

describe("User", () => {
  it("creates and hashes password", async () => {
    const user = await User.create({ username: "testuser", email: "test@x.com", password: "123456" });
    expect(user.password).not.toBe("123456");
    expect(await user.comparePassword("123456")).toBe(true);
    expect(await user.comparePassword("wrong")).toBe(false);
  });

  it("rejects short username", async () => {
    await expect(User.create({ username: "ab", email: "a@x.com", password: "123456" })).rejects.toThrow();
  });

  it("rejects duplicate email", async () => {
    await User.create({ username: "user1", email: "dup@x.com", password: "123456" });
    await expect(User.create({ username: "user2", email: "dup@x.com", password: "123456" })).rejects.toThrow();
  });

  it("toPublic excludes password", async () => {
    const user = await User.create({ username: "pubtest", email: "pub@x.com", password: "123456" });
    const pub = user.toPublic();
    expect(pub.password).toBeUndefined();
    expect(pub.username).toBe("pubtest");
  });

  it("generates verification token", async () => {
    const user = await User.create({ username: "verif", email: "verif@x.com", password: "123456" });
    const token = user.generateVerificationToken();
    expect(token).toBeTruthy();
    expect(user.emailVerificationToken).toBe(token);
    expect(user.emailVerificationExpires).toBeInstanceOf(Date);
  });

  it("generates reset token", async () => {
    const user = await User.create({ username: "reset", email: "reset@x.com", password: "123456" });
    const token = user.generateResetToken();
    expect(token).toBeTruthy();
    expect(user.resetPasswordToken).toBe(token);
    expect(user.resetPasswordExpires).toBeInstanceOf(Date);
  });
});

describe("Course", () => {
  it("creates with modules and lessons", async () => {
    const course = await Course.create({
      title: "Test Course",
      slug: "test-course",
      description: "A test",
      level: "beginner",
      published: true,
      modules: [{
        title: "Intro",
        slug: "intro",
        order: 1,
        lessons: [{ slug: "hello", title: "Hello", bodyMd: "# Hello", order: 1, points: 10 }],
      }],
    });
    expect(course.modules).toHaveLength(1);
    expect(course.modules[0].lessons).toHaveLength(1);
    expect(course.modules[0].lessons[0].slug).toBe("hello");
  });
});

describe("DocArticle", () => {
  it("creates and indexes by category", async () => {
    await DocArticle.create({ title: "Install", slug: "install", category: "setup", body: "# Install", order: 1 });
    const articles = await DocArticle.find({ category: "setup" }).sort({ order: 1 });
    expect(articles).toHaveLength(1);
    expect(articles[0].slug).toBe("install");
  });

  it("enforces unique slug", async () => {
    await DocArticle.create({ title: "A", slug: "unique", category: "x", body: "a" });
    await expect(DocArticle.create({ title: "B", slug: "unique", category: "x", body: "b" })).rejects.toThrow();
  });
});

describe("PlaygroundExample", () => {
  it("creates example", async () => {
    const ex = await PlaygroundExample.create({
      title: "Hello", slug: "hello", code: 'SOLTA O GRITO("hi")', category: "basico", order: 1,
    });
    expect(ex.slug).toBe("hello");
  });
});

describe("Hackathon", () => {
  it("creates hackathon with submissions", async () => {
    const user = await User.create({ username: "hackuser", email: "hack@x.com", password: "123456" });
    const hack = await Hackathon.create({
      title: "Hack 1", slug: "hack1", startDate: new Date(), endDate: new Date(Date.now() + 86400000),
    });
    const sub = await HackathonSubmission.create({
      hackathon: hack._id, user: user._id, title: "My Project", description: "A project",
    });
    expect(sub.title).toBe("My Project");
    expect(String(sub.hackathon)).toBe(String(hack._id));
  });
});

describe("Package", () => {
  it("creates package with versions", async () => {
    const user = await User.create({ username: "pkguser", email: "pkg@x.com", password: "123456" });
    const pkg = await Package.create({
      name: "test-pkg",
      description: "A test package",
      author: user._id,
      version: "1.0.0",
      versions: [{ version: "1.0.0", description: "First release", filePath: "/tmp/test.tar.gz", fileSize: 1024, keywords: ["test"], dependencies: ["lodash"] }],
    });
    expect(pkg.name).toBe("test-pkg");
    expect(pkg.downloads).toBe(0);
    expect(pkg.status).toBe("pending");
    expect(pkg.versions).toHaveLength(1);
    expect(pkg.versions[0].version).toBe("1.0.0");
    expect(pkg.versions[0].keywords).toEqual(["test"]);
  });

  it("rejects invalid name", async () => {
    const user = await User.create({ username: "badpkg", email: "badpkg@x.com", password: "123456" });
    await expect(Package.create({ name: "Invalid Name!", author: user._id })).rejects.toThrow();
  });
});

describe("Review", () => {
  it("creates review", async () => {
    const user = await User.create({ username: "reviewer", email: "rev@x.com", password: "123456" });
    const pkg = await Package.create({ name: "rev-pkg", description: "Pkg", author: user._id, versions: [{ version: "1.0.0" }] });
    const review = await Review.create({ package: pkg._id, user: user._id, rating: 5, title: "Great!", body: "Awesome package" });
    expect(review.rating).toBe(5);
    expect(review.title).toBe("Great!");
  });

  it("enforces unique user+package", async () => {
    const user = await User.create({ username: "rev2", email: "rev2@x.com", password: "123456" });
    const pkg = await Package.create({ name: "rev-pkg2", description: "Pkg2", author: user._id, versions: [{ version: "1.0.0" }] });
    await Review.create({ package: pkg._id, user: user._id, rating: 4 });
    await expect(Review.create({ package: pkg._id, user: user._id, rating: 3 })).rejects.toThrow();
  });
});

describe("Comment", () => {
  it("creates and populates user", async () => {
    const user = await User.create({ username: "commenter", email: "c@x.com", password: "123456" });
    const course = await Course.create({ title: "C", slug: "c", level: "beginner" });
    const comment = await Comment.create({ user: user._id, course: course._id, lessonSlug: "l1", body: "Great!" });
    const found = await Comment.findById(comment._id).populate("user", "username");
    expect(found.user.username).toBe("commenter");
    expect(found.body).toBe("Great!");
  });
});

describe("Enrollment & Certificate", () => {
  it("tracks lesson completion", async () => {
    const user = await User.create({ username: "enrolluser", email: "enroll@x.com", password: "123456" });
    const course = await Course.create({
      title: "EC", slug: "ec", level: "beginner", published: true,
      modules: [{ title: "M1", slug: "m1", order: 1, lessons: [{ slug: "l1", title: "L1", bodyMd: "# L1", order: 1, points: 10 }] }],
    });
    const enrollment = await Enrollment.create({ user: user._id, course: course._id, completedLessons: [{ lessonSlug: "l1", completedAt: new Date() }] });
    expect(enrollment.completedLessons).toHaveLength(1);
    expect(enrollment.completedLessons[0].lessonSlug).toBe("l1");
  });

  it("creates certificate with unique code", async () => {
    const user = await User.create({ username: "certuser", email: "cert@x.com", password: "123456" });
    const course = await Course.create({ title: "CertCourse", slug: "cert-course", level: "beginner" });
    const cert1 = await Certificate.create({ user: user._id, course: course._id, code: "ABC123" });
    await expect(Certificate.create({ user: user._id, course: course._id, code: "ABC123" })).rejects.toThrow();
  });
});

describe("Quiz", () => {
  it("creates quiz and attempt", async () => {
    const course = await Course.create({ title: "QCourse", slug: "qcourse", level: "beginner" });
    const quiz = await Quiz.create({
      course: course._id, moduleSlug: "intro", title: "Quiz 1", published: true,
      questions: [{ question: "Q1", options: ["A", "B"], answer: "A", points: 5 }],
    });
    expect(quiz.questions).toHaveLength(1);
    const user = await User.create({ username: "quizuser", email: "quiz@x.com", password: "123456" });
    const attempt = await QuizAttempt.create({ user: user._id, quiz: quiz._id, score: 1, total: 1, passed: true });
    expect(attempt.passed).toBe(true);
  });
});
