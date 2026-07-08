import fs from 'fs';
import path from 'path';
import lessonsData from './gen-full.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
const seedPath = path.join(__dirname, 'seed-course.js');

let content = fs.readFileSync(seedPath, 'utf8');

// Convert lesson objects to JS source code
function lessonToSource(l) {
  let s = '  {\n';
  s += '    slug: "' + l.slug + '",\n';
  s += '    title: "' + l.title.replace(/"/g, '\\"') + '",\n';
  s += '    order: ' + l.order + ',\n';
  s += '    points: ' + l.points + ',\n';
  s += '    bodyMd: `' + l.bodyMd.replace(/`/g, '\\`').replace(/\${/g, '\\${') + '`,\n';
  s += '    challenges: [\n';
  for (const c of l.challenges) {
    s += '      { question: "' + c.q.replace(/"/g, '\\"') + '", answer: "' + c.a.replace(/"/g, '\\"') + '", points: ' + c.p + ' },\n';
  }
  s += '    ],\n';
  s += '  },\n';
  return s;
}

// Build the complete lessons array source
let lessonsSource = lessonsData.map(l => lessonToSource(l)).join('');

// Find the array brackets and replace content between them
const arrStart = content.indexOf('[');
const arrEnd = content.indexOf('\n];\n');

if (arrStart === -1 || arrEnd === -1) {
  console.error('Could not find array brackets in seed-course.js');
  process.exit(1);
}

const header = content.slice(0, arrStart + 1);
const footer = content.slice(arrEnd + 1);

const finalContent = header + '\n' + lessonsSource + footer;

fs.writeFileSync(seedPath, finalContent, 'utf8');
console.log('Injected ' + lessonsData.length + ' lessons into seed-course.js');
