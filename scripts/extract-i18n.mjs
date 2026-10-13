import ts from "typescript";
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cache = new Map();

function load(relPath) {
  if (cache.has(relPath)) return cache.get(relPath);
  const filename = path.join(root, relPath);
  const src = fs.readFileSync(filename, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  const dirname = path.dirname(filename);
  function localRequire(id) {
    if (!id.startsWith(".")) return import.meta.resolve ? null : null;
    let resolved = path.normalize(path.join(dirname, id));
    if (!resolved.endsWith(".ts")) resolved += ".ts";
    return load(path.relative(root, resolved)).exports;
  }
  const wrapper = `(function(exports, require, module, __filename, __dirname){\n${js}\n})`;
  const fn = vm.runInThisContext(wrapper, { filename });
  fn(module.exports, localRequire, module, filename, dirname);
  cache.set(relPath, module);
  return module;
}

const peopleMod = load("src/data/people.ts").exports;
const placesMod = load("src/data/places.ts").exports;
const regionsMod = load("src/data/regions.ts").exports;
const projectsMod = load("src/data/projects.ts").exports;
const timelineMod = load("src/data/timeline.ts").exports;
const quizMod = load("src/data/quiz.ts").exports;
const searchMod = load("src/data/search.ts").exports;

const strings = new Set();
function add(value) {
  if (typeof value === "string" && value.trim()) strings.add(value);
}

for (const person of peopleMod.people) {
  add(person.name);
  add(person.years);
  add(person.knownFor);
  person.bio.forEach(add);
  person.places.forEach((place) => add(place.label));
}
for (const item of peopleMod.inventions) {
  add(item.title);
  add(item.text);
}
for (const item of peopleMod.roles) add(item.label);
for (const item of peopleMod.periods) add(item.label);
for (const place of placesMod.places) {
  add(place.name);
  place.lines.forEach(add);
}
for (const region of regionsMod.regions) {
  add(region.name);
  add(region.mainCity);
  add(region.land);
  region.facts.forEach(add);
  add(region.otherLanguage);
}
for (const age of projectsMod.ages) add(age);
for (const project of projectsMod.projects) {
  add(project.age);
  add(project.title);
  add(project.need);
  add(project.done);
  project.steps.forEach(add);
}
for (const event of timelineMod.timeline) {
  add(event.when);
  add(event.title);
  add(event.text);
}
for (const question of quizMod.questions) {
  add(question.prompt);
  question.choices.forEach(add);
}
add(searchMod.RULER_SENTENCE);
for (const word of ["One", "Two", "Three", "Four", "Five", "Six"]) add(`Team ${word}`);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "packs" || entry.name === "i18n") continue;
      walk(full);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      const text = fs.readFileSync(full, "utf8");
      const re = /txf?\(\s*"((?:\\.|[^"\\])*)"/g;
      let match;
      while ((match = re.exec(text))) strings.add(match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
      if (entry.name === "work.tsx") {
        const quoted = /"((?:\\.|[^"\\])*)"/g;
        let item;
        while ((item = quoted.exec(text))) {
          const value = item[1];
          if (/[A-Za-zÀ-ÿ]/.test(value) && !value.includes("class") && !value.startsWith("min-") && !value.includes("rounded") && !value.includes("border") && !value.includes("font-") && !value.includes("bg-") && !value.includes("text-") && !value.includes("/") && value !== "bank" && value !== "match" && value !== "time" && value !== "listen" && value !== "button") {
            strings.add(value);
          }
        }
      }
    }
  }
}

walk(path.join(root, "src"));

const all = [...strings].sort((a, b) => a.localeCompare(b));
const todo = all.filter((value) => /[A-Za-z]/.test(value) && !/^\d{3,4}$/.test(value));
fs.mkdirSync(path.join(root, "src/i18n"), { recursive: true });
fs.writeFileSync(path.join(root, "src/i18n/strings.json"), JSON.stringify(all, null, 2));
fs.writeFileSync(path.join(root, "src/i18n/todo.json"), JSON.stringify(todo, null, 2));
console.log(`strings ${all.length} todo ${todo.length}`);
