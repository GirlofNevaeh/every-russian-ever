import fs from "node:fs";

const [command, locale, slice, extra] = process.argv.slice(2);
if (!command || !locale || slice === undefined) {
  console.error("usage: node scripts/i18n-slice.mjs <status|next|merge> <locale> <slice> [n|batch]");
  process.exit(1);
}

const slicePath = `src/i18n/slices/${slice}.json`;
const dest = `src/i18n/partials/${locale}-${slice}.json`;
const source = JSON.parse(fs.readFileSync(slicePath, "utf8"));
fs.mkdirSync("src/i18n/partials", { recursive: true });
const pack = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, "utf8")) : {};

function missing() {
  return source.filter((item) => typeof pack[item] !== "string" || !pack[item].trim());
}

if (command === "status") {
  console.log(`${locale} slice ${slice} missing ${missing().length} of ${source.length}`);
} else if (command === "next") {
  const n = Number(extra ?? 60);
  const items = missing().slice(0, n);
  const out = `/tmp/i18n-${locale}-${slice}-next.json`;
  fs.writeFileSync(out, JSON.stringify(items, null, 2));
  console.log(`${locale} slice ${slice} next ${items.length} -> ${out}`);
} else if (command === "merge") {
  const batch = JSON.parse(fs.readFileSync(extra, "utf8"));
  let added = 0;
  for (const [key, value] of Object.entries(batch)) {
    if (typeof value !== "string" || !value.trim()) continue;
    if (!source.includes(key)) continue;
    pack[key] = value;
    added += 1;
  }
  fs.writeFileSync(dest, JSON.stringify(pack, null, 2) + "\n");
  console.log(`${locale} slice ${slice} merged ${added}, missing ${missing().length}`);
} else {
  console.error("unknown command");
  process.exit(1);
}
