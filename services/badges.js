import Badge from "../models/Badge.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const BADGE_DEFS = [
  { slug: "first-lesson", name: "First Steps", description: "Complete your first lesson", icon: "🌱" },
  { slug: "streak-3", name: "On a Roll", description: "3-day study streak", icon: "🔥" },
  { slug: "streak-7", name: "Week Warrior", description: "7-day study streak", icon: "💪" },
  { slug: "streak-30", name: "Monthly Master", description: "30-day study streak", icon: "🏆" },
  { slug: "course-complete", name: "Course Graduate", description: "Complete all lessons in any course", icon: "🎓" },
  { slug: "all-courses", name: "Dedicado", description: "Complete 2 cursos", icon: "🌍" },
  { slug: "xp-500", name: "Dedicated", description: "Earn 500 XP", icon: "⭐" },
  { slug: "xp-1000", name: "Xana Scholar", description: "Earn 1000 XP", icon: "🌟" },
  { slug: "xp-2000", name: "Xana Master", description: "Earn 2000 XP", icon: "👑" },
  { slug: "challenge-master", name: "Challenge Master", description: "Pass 50 challenges", icon: "🧠" },
];

export function getBadgeDefs() {
  return BADGE_DEFS;
}

export async function checkAndAwardBadges(userId) {
  const badges = [];
  const have = new Set((await Badge.find({ userId }).lean()).map(b => b.slug));

  const enrollments = await Enrollment.find({ userId }).lean();
  const user = await User.findById(userId).select("xp level streak").lean();
  if (!user) return badges;

  const totalLessonsDone = enrollments.reduce((s, e) => {
    return s + (e.progress || []).filter(p => p.completed).length;
  }, 0);
  const totalChallengesPassed = enrollments.reduce((s, e) => {
    return s + (e.progress || []).reduce((s2, p) => s2 + (p.challengesPassed || 0), 0);
  }, 0);
  const coursesDone = enrollments.filter(e => e.completedAt).length;

  const courseIds = enrollments.map(e => e.courseId).filter(Boolean);
  const courses = courseIds.length ? await Course.find({ _id: { $in: courseIds } }).select("lang").lean() : [];
  const completedCourseIds = enrollments.filter(e => e.completedAt).map(e => String(e.courseId));
  const xp = user.xp || 0;
  const streak = user.streak || 0;

  const checks = [
    { slug: "first-lesson", earned: totalLessonsDone >= 1 },
    { slug: "streak-3", earned: streak >= 3 },
    { slug: "streak-7", earned: streak >= 7 },
    { slug: "streak-30", earned: streak >= 30 },
    { slug: "course-complete", earned: coursesDone >= 1 },
    { slug: "all-courses", earned: courses.filter(c => completedCourseIds.includes(String(c._id))).length >= 2 },
    { slug: "xp-500", earned: xp >= 500 },
    { slug: "xp-1000", earned: xp >= 1000 },
    { slug: "xp-2000", earned: xp >= 2000 },
    { slug: "challenge-master", earned: totalChallengesPassed >= 50 },
  ];

  for (const c of checks) {
    if (c.earned && !have.has(c.slug)) {
      const def = BADGE_DEFS.find(b => b.slug === c.slug);
      if (def) {
        await Badge.create({ userId, slug: c.slug, name: def.name, description: def.description, icon: def.icon });
        badges.push(def);
      }
    }
  }

  return badges;
}