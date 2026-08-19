import { Router } from "express";
import { asyncHandler } from "../middleware/auth.js";
import { auth, optionalAuth, adminPageAuth } from "../middleware/auth.js";
import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";
import Package from "../models/Package.js";
import User from "../models/User.js";

const router = Router();

router.get("/", (req, res) => res.render("index", {
  title: "",
  description: "XanaScript é uma linguagem de programação com sintaxe em português. Compilador otimizante, ORM embutido, gerenciador de pacotes e suporte a WebAssembly.",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "XanaScript",
    url: "https://xanascript.xyz/",
    description: "Linguagem de programação com sintaxe em português.",
    author: { "@type": "Person", name: "@flazo0", url: "https://www.instagram.com/flazo0/" },
  },
}));

router.get("/docs", asyncHandler(async (req, res) => {
  const articles = await DocArticle.find({ published: true }).sort({ category: 1, order: 1 });
  const categories = {};
  for (const a of articles) {
    if (!categories[a.category]) categories[a.category] = [];
    categories[a.category].push(a);
  }
  res.render("docs/index", { categories, title: "Documentação", description: "Documentação oficial da linguagem XanaScript: sintaxe, biblioteca padrão, ORM embutido e guias de início rápido." });
}));

router.get("/docs/:slug", asyncHandler(async (req, res) => {
  const article = await DocArticle.findOne({ slug: req.params.slug, published: true });
  if (!article) return res.status(404).render("404");
  const all = await DocArticle.find({ published: true }).sort({ category: 1, order: 1 });
  res.render("docs/show", { article, all, title: article.title, description: `Guia de XanaScript: ${article.title}. Aprenda direto na documentação oficial.`, canonicalPath: `/docs/${article.slug}`, jsonLd: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    about: "XanaScript",
    datePublished: article.createdAt ? article.createdAt.toISOString() : undefined,
    dateModified: article.updatedAt ? article.updatedAt.toISOString() : undefined,
    url: `https://xanascript.xyz/docs/${article.slug}`,
  } });
}));

router.get("/playground", asyncHandler(async (req, res) => {
  const examples = await PlaygroundExample.find({ published: true }).sort({ category: 1, order: 1 });
  res.render("playground/index", { examples, title: "Playground", description: "Experimente XanaScript online no Playground: rode código em português direto no navegador." });
}));

router.get("/courses", asyncHandler(async (req, res) => {
  const courses = await Course.find({ published: true }).sort({ createdAt: -1 });
  res.render("courses/index", { courses, title: "Cursos", description: "Cursos gratuitos de XanaScript: aprenda a programar em português do zero ao avançado." });
}));

router.get("/courses/:slug", optionalAuth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  const { Quiz } = await import("../models/Quiz.js");
  const quiz = await Quiz.findOne({ course: course._id, published: true }).select("title slug moduleSlug questions");
  let enrollment = null;
  if (req.user) enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  const allLessons = course.modules.flatMap(m => m.lessons);
  const completedSlugs = enrollment?.completedLessons?.map(l => l.lessonSlug) || [];
  const progress = {
    total: allLessons.length,
    done: completedSlugs.length,
    percent: allLessons.length ? Math.round((completedSlugs.length / allLessons.length) * 100) : 0,
    quizDone: !!enrollment?.quizPassed,
  };
  res.render("courses/show", { course, quiz, enrollment, progress, user: req.user, title: course.title, description: course.description || `Curso de XanaScript: ${course.title}.`, canonicalPath: `/courses/${course.slug}`, jsonLd: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || `Curso de XanaScript: ${course.title}.`,
    provider: { "@type": "Organization", name: "XanaScript", sameAs: "https://xanascript.xyz" },
    url: `https://xanascript.xyz/courses/${course.slug}`,
  } });
}));

router.get("/courses/:slug/lessons/:lessonSlug", optionalAuth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  let lesson = null;
  let lessonIndex = -1;
  const allLessons = course.modules.flatMap(m => m.lessons);
  for (let i = 0; i < allLessons.length; i++) {
    if (allLessons[i].slug === req.params.lessonSlug) { lesson = allLessons[i]; lessonIndex = i; break; }
  }
  if (!lesson) return res.status(404).render("404");
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;
  let enrollment = null;
  if (req.user) enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  const { Quiz } = await import("../models/Quiz.js");
  const quiz = await Quiz.findOne({ course: course._id, published: true }).select("title");
  res.render("courses/lesson", { course, lesson, prevLesson, nextLesson, allLessons, lessonIndex, quiz, enrollment, title: lesson.title, user: req.user });
}));

router.post("/courses/:slug/lessons/:lessonSlug/complete", auth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).render("404");
  const enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  if (!enrollment) {
    await Enrollment.create({ user: req.user.id, course: course._id, completedLessons: [] });
  }
  const isDone = enrollment?.completedLessons?.some(l => l.lessonSlug === req.params.lessonSlug);
  if (!isDone) {
    const updated = await Enrollment.findOneAndUpdate(
      { user: req.user.id, course: course._id },
      { $push: { completedLessons: { lessonSlug: req.params.lessonSlug, completedAt: new Date() } } },
      { new: true }
    );
    const allLessons = course.modules.flatMap(m => m.lessons);
    const completed = updated.completedLessons.map(l => l.lessonSlug);
    const allDone = allLessons.every(l => completed.includes(l.slug));
    const isComplete = allDone && updated.quizPassed;
    updated.completed = isComplete;
    updated.completedAt = isComplete ? new Date() : null;
    await updated.save();
  }
  res.redirect(303, `/courses/${course.slug}/lessons/${req.params.lessonSlug}`);
}));

router.get("/courses/:slug/quiz/:quizId", optionalAuth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) return res.status(404).render("404");
  const Quiz = (await import("../models/Quiz.js")).Quiz;
  const quiz = await Quiz.findById(req.params.quizId).catch(() => null);
  if (!quiz) return res.status(404).render("404");
  if (String(quiz.course) !== String(course._id)) return res.status(404).render("404");
  let enrollment = null;
  if (req.user) enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  res.render("courses/quiz", { course, quiz, enrollment, user: req.user, title: quiz.title });
}));

router.get("/courses/:slug/certificate", auth, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).render("404");
  const enrollment = await Enrollment.findOne({ user: req.user.id, course: course._id });
  if (!enrollment?.completed) {
    return res.render("courses/certificate-locked", { course, title: "Certificado", description: `Complete o curso ${course.title} para desbloquear o certificado.`, seoIndexable: false });
  }
  let cert = await Certificate.findOne({ user: req.user.id, course: course._id }).populate("user", "username");
  if (!cert) {
    const crypto = await import("crypto");
    cert = await Certificate.create({
      user: req.user.id,
      course: course._id,
      code: crypto.randomBytes(16).toString("hex").toUpperCase(),
    });
    cert = await cert.populate("user", "username");
  }
  res.render("courses/certificate", { course, cert, enrollment, user: req.user, title: "Certificado", description: `Certificado de conclusão do curso ${course.title}.`, seoIndexable: false });
}));

router.get("/packages", asyncHandler(async (req, res) => {
  const filter = { status: "approved" };
  if (req.query.q) filter.$text = { $search: req.query.q };
  const packages = await Package.find(filter).sort({ downloads: -1 }).lean();
  const usernameCache = new Map();
  for (const p of packages) {
    if (p.author && typeof p.author === "object" && p.author._id) {
      p.authorUsername = p.author.username;
    } else if (p.author && typeof p.author === "string") {
      if (!usernameCache.has(p.author)) {
        const author = await User.findOne({ username: p.author }).select("username").lean();
        usernameCache.set(p.author, author ? author.username : p.author);
      }
      p.authorUsername = usernameCache.get(p.author);
    } else {
      p.authorUsername = "?";
    }
    delete p.author;
  }
  res.render("packages/index", { packages, title: "Pacotes", query: req.query.q || "", description: "Descubra pacotes da comunidade XanaScript: bibliotecas, módulos e ferramentas prontos para usar." });
}));

router.get("/packages/dashboard", auth, asyncHandler(async (req, res) => {
  const packages = await Package.find({ author: req.user.id }).sort({ createdAt: -1 }).lean();
  res.render("packages/dashboard", { layout: "layouts/app", activeNav: "packages", packages, title: "Meus Pacotes" });
}));

router.get("/packages/:name", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name }).lean();
  if (!pkg) return res.status(404).render("404");
  if (pkg.author && typeof pkg.author === "object" && pkg.author._id) {
    pkg.authorUsername = pkg.author.username;
  } else if (pkg.author && typeof pkg.author === "string") {
    const author = await User.findOne({ username: pkg.author }).select("username").lean();
    pkg.authorUsername = author ? author.username : pkg.author;
  } else {
    pkg.authorUsername = "?";
  }
  delete pkg.author;
  const Review = (await import("../models/Review.js")).default;
  const reviews = await Review.find({ package: pkg._id }).populate("user", "username").sort({ createdAt: -1 }).limit(50).lean();
  res.render("packages/show", { pkg, reviews, title: pkg.name, description: pkg.description || `Pacote ${pkg.name} para XanaScript.`, canonicalPath: `/packages/${pkg.name}`, jsonLd: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: pkg.name,
    description: pkg.description || `Pacote ${pkg.name} para XanaScript.`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: `https://xanascript.xyz/packages/${pkg.name}`,
  } });
}));

router.get("/packages/:name/:version", asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ name: req.params.name }).lean();
  if (!pkg) return res.status(404).render("404");
  const ver = pkg.versions.find(v => v.version === req.params.version);
  if (!ver) return res.status(404).render("404");
  const versionPkg = { ...pkg, ...ver, version: ver.version };
  if (versionPkg.author && typeof versionPkg.author === "object" && versionPkg.author._id) {
    versionPkg.authorUsername = versionPkg.author.username;
  } else if (versionPkg.author && typeof versionPkg.author === "string") {
    const author = await User.findOne({ username: versionPkg.author }).select("username").lean();
    versionPkg.authorUsername = author ? author.username : versionPkg.author;
  } else {
    versionPkg.authorUsername = "?";
  }
  delete versionPkg.author;
  const Review = (await import("../models/Review.js")).default;
  const reviews = await Review.find({ package: pkg._id }).populate("user", "username").sort({ createdAt: -1 }).limit(50).lean();
  res.render("packages/show", { pkg: versionPkg, reviews, title: `${pkg.name} v${ver.version}`, description: pkg.description || `Pacote ${pkg.name} para XanaScript.`, canonicalPath: `/packages/${pkg.name}`, jsonLd: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: pkg.name,
    description: pkg.description || `Pacote ${pkg.name} para XanaScript.`,
    softwareVersion: ver.version,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: `https://xanascript.xyz/packages/${pkg.name}`,
  } });
}));

router.get("/dashboard", auth, asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user.id }).populate("course", "title slug modules");
  const packages = await Package.find({ author: req.user.id });
  res.render("dashboard", { layout: "layouts/app", activeNav: "dashboard", enrollments, packages, title: "Dashboard" });
}));

router.get("/settings", auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.render("settings", { layout: "layouts/app", activeNav: "settings", user, title: "Configurações" });
}));

router.get("/forgot-password", (req, res) => res.render("auth/forgot-password", { layout: "layouts/auth", title: "Recuperar senha", seoIndexable: false }));
router.get("/reset-password/:token", (req, res) => res.render("auth/reset-password", { layout: "layouts/auth", token: req.params.token, title: "Nova senha", seoIndexable: false }));
router.get("/login", (req, res) => res.render("auth/login", { layout: "layouts/auth", title: "Entrar", seoIndexable: false }));
router.get("/signup", (req, res) => res.render("auth/signup", { layout: "layouts/auth", title: "Criar conta", seoIndexable: false }));
router.get("/admin*", adminPageAuth, (req, res) => res.render("admin/index", { layout: "layouts/app", activeNav: "admin", title: "Admin", seoIndexable: false }));
router.get("/examples", (req, res) => res.render("examples", { title: "Exemplos", description: "Exemplos de código em XanaScript: sintaxe, loops, funções e ORM embutido para aprender programando." }));
router.get("/privacy", (req, res) => res.render("privacy", { title: "Privacidade", description: "Política de privacidade do XanaScript: como coletamos, usamos e protegemos seus dados.", canonicalPath: "/privacy" }));
router.get("/donate", (req, res) => res.render("donate", { title: "Doar", description: "Apoie o desenvolvimento do XanaScript. Sua doação mantém a linguagem gratuita e open source.", canonicalPath: "/donate" }));

router.get("/benchmark", (req, res) => {
  const benchmarks = [
    { name: "Fibonacci (n=40)", xs: 0.8, js: 1.2, python: 18.5, lua: 2.1, unit: "s" },
    { name: "Loop 10M iterações", xs: 0.15, js: 0.18, python: 3.2, lua: 0.35, unit: "s" },
    { name: "Startup time", xs: 0.02, js: 0.08, python: 0.35, lua: 0.01, unit: "s" },
  ];
  res.render("benchmark", { benchmarks, title: "Benchmark", description: "Benchmark do XanaScript vs JavaScript, Python e Lua: velocidade e tempo de inicialização comparados.", canonicalPath: "/benchmark" });
});

router.get("/changelog", (req, res) => {
  const changelog = [
    { version: "3.0.1", date: "2026-08-17", type: "patch", changes: ["Formatter (`xana fmt`) corrigido: sem espaços duplicados e com suporte a `i++`/`++i`", "Precedência de operadores respeitada na formatação", "Correções em módulos locais e no desligamento do servidor HTTP"] },
    { version: "3.0.0", date: "2026-08-17", type: "major", changes: ["Type checker com inferência estática (`xana check`)", "Debug Adapter Protocol (`xana debuga`)", "Geração WebAssembly mais robusta com fallback WAT", "ORM com validação de campos e deep copies", "Arrow functions assíncronas e novas palavras-chave de tipo", "Test runner com `--watch` e `crush(...)`", "Docs unificadas"] },
    { version: "2.2.8", date: "2026-07-23", type: "patch", changes: ["Auto-install de dependências", "Melhorias no sistema de import", "Correções de segurança"] },
    { version: "2.0.0", date: "2026-07-01", type: "major", changes: ["Compilador otimizante", "ORM embutido", "LSP server", "Gerenciador de pacotes"] },
  ];
  res.render("changelog", { changelog, title: "Changelog", description: "Histórico de versões do XanaScript: novidades, correções e melhorias de cada release.", canonicalPath: "/changelog" });
});

export default router;
