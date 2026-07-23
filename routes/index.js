import { Router } from "express";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import Course from "../models/Course.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

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

router.get("/packages", async (req, res) => {
  const { default: Package } = await import("../models/Package.js");
  const packages = await Package.find({ approved: true, published: true }).populate("author", "username").sort({ downloads: -1 });
  res.render("packages/index", { packages, title: "Pacotes" });
});

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Entrar" });
});

router.get("/signup", (req, res) => {
  res.render("auth/signup", { title: "Criar conta" });
});

router.get("/changelog", (req, res) => {
  const changelog = [
    { version: "2.2.8", date: "2026-07-23", changes: ["Auto-install de dependências", "Melhorias no sistema de import", "Correções de segurança"], type: "patch" },
    { version: "2.0.0", date: "2026-07-01", changes: ["Compilador otimizante", "ORM embutido", "LSP server", "Gerenciador de pacotes"], type: "major" },
  ];
  res.render("changelog", { changelog, title: "Changelog" });
});

router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacidade" });
});

export default router;
