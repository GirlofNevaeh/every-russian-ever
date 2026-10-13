import { people } from "./people";
import { places } from "./places";
import { regions } from "./regions";
import { fold } from "./search";
import gd from "@/i18n/packs/gd.json";
import cy from "@/i18n/packs/cy.json";
import ga from "@/i18n/packs/ga.json";
import fr from "@/i18n/packs/fr.json";
import it from "@/i18n/packs/it.json";
import es from "@/i18n/packs/es.json";
import de from "@/i18n/packs/de.json";
import ru from "@/i18n/packs/ru.json";

const packs = [gd, cy, ga, fr, it, es, de, ru] as Record<string, string>[];
const full = new Set<string>();
const translated = new Map<string, string[]>();

function add(value: string | undefined) {
  if (!value) return;
  const folded = fold(value);
  if (folded.length >= 2) full.add(folded);
}

for (const person of people) {
  add(person.name);
  add(person.nameRu);
  add(person.latin);
  person.aliases.forEach(add);
}

for (const place of places) {
  add(place.name);
  add(place.nameRu);
  add(place.latin);
}

for (const region of regions) {
  add(region.name);
  add(region.nameRu);
  add(region.latin);
  add(region.mainCity);
  add(region.mainCityRu);
}

for (const pack of packs) {
  for (const person of people) add(pack[person.name]);
  for (const place of places) add(pack[place.name]);
  for (const region of regions) {
    add(pack[region.name]);
    add(pack[region.mainCity]);
  }
}

export function translatedNames(english: string) {
  const cached = translated.get(english);
  if (cached) return cached;
  const parts: string[] = [];
  for (const pack of packs) {
    const value = pack[english];
    if (value && value !== english) parts.push(value);
  }
  translated.set(english, parts);
  return parts;
}

export function isFullName(query: string) {
  return full.has(fold(query));
}
