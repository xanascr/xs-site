import fs from "fs";

const content = fs.readFileSync("scripts/seed-course-pt.js", "utf8");
const fixed = content.replace(/\$\{/g, "\\${");
fs.writeFileSync("scripts/seed-course-pt.js", fixed);
console.log("Fixed all ${ to \\${ in seed-course-pt.js");