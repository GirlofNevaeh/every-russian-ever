const CY: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ж: "zh",
  з: "z",
  и: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function fold(value: string) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/ß/g, "ss")
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ø/g, "o")
    .replace(/ł/g, "l")
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9а-я\s-]/gi, " ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function translit(folded: string, yot: "y" | "i") {
  let out = "";
  for (const ch of folded) {
    if (ch === " ") {
      out += " ";
      continue;
    }
    if (ch === "й") {
      out += yot;
      continue;
    }
    out += CY[ch] ?? ch;
  }
  return out.replace(/\s+/g, " ").trim();
}

export function keysFor(...parts: string[]) {
  const set = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    const folded = fold(part);
    if (!folded) continue;
    set.add(folded);
    set.add(translit(folded, "y"));
    set.add(translit(folded, "i"));
    for (const word of folded.split(" ")) {
      if (word.length >= 3) {
        set.add(word);
        set.add(translit(word, "y"));
        set.add(translit(word, "i"));
      }
    }
  }
  return [...set];
}

export function queryKeys(query: string) {
  return keysFor(query).filter((key) => key.length >= 2);
}

export function matchesKeys(query: string, keys: string[]) {
  const qs = queryKeys(query);
  return qs.some((q) => keys.some((key) => key.includes(q)));
}

const RULER_ALIASES = [
  "lenin",
  "ленин",
  "vladimir lenin",
  "владимир ленин",
  "vladimir ilyich lenin",
  "ulyanov",
  "ульянов",
  "stalin",
  "сталин",
  "joseph stalin",
  "iosif stalin",
  "иосиф сталин",
  "dzhugashvili",
  "джугашвили",
  "khrushchev",
  "khrushchov",
  "хрущев",
  "хрущёв",
  "nikita khrushchev",
  "никита хрущев",
  "brezhnev",
  "брежнев",
  "leonid brezhnev",
  "леонид брежнев",
  "andropov",
  "андропов",
  "yuri andropov",
  "юрий андропов",
  "chernenko",
  "черненко",
  "konstantin chernenko",
  "константин черненко",
  "malenkov",
  "маленков",
  "georgy malenkov",
  "георгий маленков",
];

const rulerKeys = keysFor(...RULER_ALIASES);

export function isSovietRulerQuery(query: string) {
  const folded = fold(query);
  if (!folded) return false;
  const words = folded.split(" ");
  return rulerKeys.some((alias) => {
    const a = fold(alias);
    if (!a || a.length < 5) return false;
    if (folded === a) return true;
    return words.includes(a);
  });
}

export const RULER_SENTENCE =
  "After 1917, people could not freely choose their rulers, and many people were hurt. That was wrong.";
