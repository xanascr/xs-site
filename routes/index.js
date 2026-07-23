import { Router } from "express";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";
import { Hackathon } from "../models/Hackathon.js";
import { auth, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => res.render("index"));

router.get("/docs", async (req, res) => {
  const articles = await DocArticle.find({ published: true }).sort({ category: 1, order: 1 });
  const categories = {};
  for (const a of articles) {
    if (!categories[a.category]) categories[a.category] = [];
    categories[a.category].push(a);
  }
  res.render("docs/index", { categories, title: "Documentação" });
});

router.get("/docs/:slug", async (req, res) => {
  const article = await DocArticle.findOne({ slug: req.params.slug, published: true });
  if (!article) return res.status(404).render("404");
  const all = await DocArticle.find({ published: true }).sort({ category: 1, order: 1 });
  res.render("docs/show", { article, all, title: article.title });
});

router.get("/playground", async (req, res) => {
  const examples = await PlaygroundExample.find({ published: true }).sort({ category: 1, order: 1 });
  res.render("playground/index", { examples, title: "Playground" });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({ published: true }).sort({ createdAt: -1 });
  res.render("courses/index", { courses, title: "Cursos" });
});

router.get("/courses/:slug", async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  res.render("courses/show", { course, title: course.title });
});

router.get("/courses/:slug/lessons/:lessonSlug", optionalAuth, async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  let lesson = null;
  for (const m of course.modules) {
    lesson = m.lessons.find(l => l.slug === req.params.lessonSlug);
    if (lesson) break;
  }
  if (!lesson) return res.status(404).render("404");
  let enrollment = null;
  if (req.user) enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  res.render("courses/lesson", { course, lesson, enrollment, title: lesson.title });
});

router.get("/courses/:slug/quiz/:quizId", optionalAuth, async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  const { Quiz } = await import("../models/Quiz.js");
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return res.status(404).render("404");
  res.render("courses/quiz", { course, quiz, title: quiz.title });
});

router.get("/courses/:slug/certificate", auth, async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).render("404");
  const cert = await Certificate.findOne({ user: req.user.id, course: course._id }).populate("user", "username");
  if (!cert) return res.status(404).render("404");
  res.render("courses/certificate", { course, cert, title: "Certificado" });
});

router.get("/packages", async (req, res) => {
  const { default: Package } = await import("../models/Package.js");
  const packages = await Package.find({ approved: true, published: true }).populate("author", "username").sort({ downloads: -1 });
  res.render("packages/index", { packages, title: "Pacotes" });
});

router.get("/packages/:name", async (req, res) => {
  const { default: Package } = await import("../models/Package.js");
  const pkg = await Package.findOne({ name: req.params.name }).populate("author", "username");
  if (!pkg) return res.status(404).render("404");
  res.render("packages/show", { pkg, title: pkg.name });
});

router.get("/packages/dashboard", auth, async (req, res) => {
  const { default: Package } = await import("../models/Package.js");
  const packages = await Package.find({ author: req.user.id }).sort({ createdAt: -1 });
  res.render("packages/dashboard", { packages, title: "Meus Pacotes" });
});

router.get("/hackathons", async (req, res) => {
  const hackathons = await Hackathon.find().sort({ startDate: -1 });
  res.render("hackathons/index", { hackathons, title: "Hackathons" });
});

router.get("/hackathons/:id", async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);
  if (!hackathon) return res.status(404).render("404");
  const { HackathonSubmission } = await import("../models/Hackathon.js");
  const submissions = await HackathonSubmission.find({ hackathon: hackathon._id }).populate("user", "username");
  res.render("hackathons/show", { hackathon, submissions, title: hackathon.title });
});

router.get("/dashboard", auth, async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user.id }).populate("course", "title slug");
  const { default: Package } = await import("../models/Package.js");
  const packages = await Package.find({ author: req.user.id });
  res.render("dashboard", { enrollments, packages, title: "Dashboard" });
});

router.get("/settings", auth, async (req, res) => {
  const { default: User } = await import("../models/User.js");
  const user = await User.findById(req.user.id).select("-password");
  res.render("settings", { user, title: "Configurações" });
});

router.get("/forgot-password", (req, res) => res.render("auth/forgot-password", { title: "Recuperar senha" }));
router.get("/reset-password/:token", (req, res) => res.render("auth/reset-password", { token: req.params.token, title: "Nova senha" }));

router.get("/login", (req, res) => res.render("auth/login", { title: "Entrar" }));
router.get("/signup", (req, res) => res.render("auth/signup", { title: "Criar conta" }));

router.get("/changelog", (req, res) => {
  const changelog = [
    { version: "2.2.8", date: "2026-07-23", type: "patch", changes: ["Auto-install de dependências", "Melhorias no sistema de import", "Correções de segurança"] },
    { version: "2.0.0", date: "2026-07-01", type: "major", changes: ["Compilador otimizante", "ORM embutido", "LSP server", "Gerenciador de pacotes"] },
  ];
  res.render("changelog", { changelog, title: "Changelog" });
});

router.get("/benchmark", (req, res) => {
  const benchmarks = [
    { name: "Fibonacci (n=40)", xs: 0.8, js: 1.2, python: 18.5, lua: 2.1, unit: "s" },
    { name: "Loop 10M iterações", xs: 0.15, js: 0.18, python: 3.2, lua: 0.35, unit: "s" },
    { name: "Startup time", xs: 0.02, js: 0.08, python: 0.35, lua: 0.01, unit: "s" },
  ];
  res.render("benchmark", { benchmarks, title: "Benchmark" });
});

router.get("/donate", (req, res) => res.render("donate", { title: "Doar" }));
router.get("/admin*", (req, res) => res.render("admin/index", { title: "Admin" }));
router.get("/examples", (req, res) => res.render("examples", { title: "Exemplos" }));
router.get("/privacy", (req, res) => res.render("privacy", { title: "Privacidade" }));

export default router;
