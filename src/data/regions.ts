import { keysFor } from "./search";

export type Region = {
  slug: string;
  name: string;
  nameRu: string;
  latin: string;
  mainCity: string;
  mainCityRu: string;
  land: string;
  facts: [string, string];
  placeSlug?: string;
  otherLanguage?: string;
  shape: string;
  keys: string[];
};

function region(input: Omit<Region, "keys"> & { aliases?: string[] }): Region {
  const { aliases = [], ...rest } = input;
  return {
    ...rest,
    keys: keysFor(rest.name, rest.nameRu, rest.latin, rest.mainCity, rest.mainCityRu, ...aliases),
  };
}

export const regions: Region[] = [
  region({
    slug: "moscow-city",
    name: "Moscow",
    nameRu: "Москва",
    latin: "Moskva",
    mainCity: "Moscow",
    mainCityRu: "Москва",
    land: "The capital city, on the Moscow River.",
    facts: ["The Kremlin and Red Square are here.", "Parliament meets in this city."],
    placeSlug: "kremlin",
    shape: "M30 28h40l8 18-8 26H28l-8-22z",
  }),
  region({
    slug: "saint-petersburg",
    name: "Saint Petersburg",
    nameRu: "Санкт-Петербург",
    latin: "Sankt-Peterburg",
    mainCity: "Saint Petersburg",
    mainCityRu: "Санкт-Петербург",
    land: "A city on the Gulf of Finland, by the Baltic Sea.",
    facts: [
      "Peter the Great began the city in 1703.",
      "It was later called Petrograd, and then Leningrad. Those are old names. The city is Saint Petersburg now.",
    ],
    placeSlug: "hermitage",
    aliases: ["st petersburg", "петербург", "ленинград", "петроград", "петроград"],
    shape: "M18 40h50l14-8 10 20-16 18H22l-12-14z",
  }),
  region({
    slug: "moscow-oblast",
    name: "Moscow Oblast",
    nameRu: "Московская область",
    latin: "Moskovskaya oblast",
    mainCity: "Moscow",
    mainCityRu: "Москва",
    land: "The land that wraps around the city of Moscow.",
    facts: ["The Trinity Lavra in Sergiyev Posad is here.", "Woods and small rivers fill the land."],
    placeSlug: "lavra",
    shape: "M22 18h56l12 20-6 28-20 16H30L12 58 10 32z",
  }),
  region({
    slug: "novgorod-oblast",
    name: "Novgorod Oblast",
    nameRu: "Новгородская область",
    latin: "Novgorodskaya oblast",
    mainCity: "Veliky Novgorod",
    mainCityRu: "Великий Новгород",
    land: "Rivers and old towns, west of Moscow.",
    facts: ["Veliky Novgorod is one of the oldest cities in Russia.", "The fortress there is called the Detinets."],
    placeSlug: "novgorod",
    shape: "M16 30h48l18 8v28l-22 14H24L8 52z",
  }),
  region({
    slug: "karelia",
    name: "Republic of Karelia",
    nameRu: "Республика Карелия",
    latin: "Respublika Kareliya",
    mainCity: "Petrozavodsk",
    mainCityRu: "Петрозаводск",
    land: "Lakes and forests near Finland.",
    facts: ["Kizhi is on an island in Lake Onega.", "The land has a great many lakes."],
    placeSlug: "kizhi",
    aliases: ["karelia", "карелия"],
    shape: "M28 8h30l16 22-8 30-24 18-22-10-8-28z",
  }),
  region({
    slug: "tatarstan",
    name: "Republic of Tatarstan",
    nameRu: "Республика Татарстан",
    latin: "Respublika Tatarstan",
    mainCity: "Kazan",
    mainCityRu: "Казань",
    land: "A republic along the River Volga.",
    facts: ["The Kazan Kremlin has a mosque and a church side by side.", "Tatar and Russian are both official languages."],
    placeSlug: "kazan",
    otherLanguage: "Tatar",
    aliases: ["tatarstan", "татарстан", "kazan"],
    shape: "M20 32h46l14 10-4 22H28L12 48z",
  }),
  region({
    slug: "sverdlovsk",
    name: "Sverdlovsk Oblast",
    nameRu: "Свердловская область",
    latin: "Sverdlovskaya oblast",
    mainCity: "Yekaterinburg",
    mainCityRu: "Екатеринбург",
    land: "The Ural mountains, where people mark Europe and Asia.",
    facts: ["Yekaterinburg sits by the Urals.", "The Urals are old mountains, and not very high."],
    placeSlug: "ural",
    aliases: ["yekaterinburg", "екатеринбург", "sverdlovsk"],
    shape: "M40 10h22l8 70H36l-6-34z",
  }),
  region({
    slug: "novosibirsk-oblast",
    name: "Novosibirsk Oblast",
    nameRu: "Новосибирская область",
    latin: "Novosibirskaya oblast",
    mainCity: "Novosibirsk",
    mainCityRu: "Новосибирск",
    land: "By the River Ob, in Siberia.",
    facts: ["Novosibirsk is a large city in Siberia.", "The Ob is a great river."],
    placeSlug: "novosibirsk",
    shape: "M18 28h58l8 16-14 22H24L10 46z",
  }),
  region({
    slug: "krasnoyarsk",
    name: "Krasnoyarsk Krai",
    nameRu: "Красноярский край",
    latin: "Krasnoyarsky krai",
    mainCity: "Krasnoyarsk",
    mainCityRu: "Красноярск",
    land: "A very wide land on the Yenisei River.",
    facts: ["The Yenisei flows north to the Arctic.", "This region is one of the largest in Russia."],
    aliases: ["krasnoyarsk", "красноярск", "yenisei", "енисей"],
    shape: "M34 6h28l10 78H30L22 40z",
  }),
  region({
    slug: "irkutsk",
    name: "Irkutsk Oblast",
    nameRu: "Иркутская область",
    latin: "Irkutskaya oblast",
    mainCity: "Irkutsk",
    mainCityRu: "Иркутск",
    land: "Beside Lake Baikal.",
    facts: ["Lake Baikal is the deepest lake in the world.", "The Angara River flows out of the lake."],
    placeSlug: "baikal",
    aliases: ["irkutsk", "иркутск", "baikal"],
    shape: "M16 34h40l22 8 6 20-24 16H22L8 52z",
  }),
  region({
    slug: "primorsky",
    name: "Primorsky Krai",
    nameRu: "Приморский край",
    latin: "Primorsky krai",
    mainCity: "Vladivostok",
    mainCityRu: "Владивосток",
    land: "On the Pacific Ocean, in the far south-east.",
    facts: ["Vladivostok is a port on the Pacific.", "The land meets the sea along a long coast."],
    placeSlug: "vladivostok",
    aliases: ["primorye", "приморье", "vladivostok"],
    shape: "M48 12h16l10 20-6 36-18 16-12-24 8-28z",
  }),
  region({
    slug: "sakha",
    name: "Republic of Sakha (Yakutia)",
    nameRu: "Республика Саха (Якутия)",
    latin: "Respublika Sakha",
    mainCity: "Yakutsk",
    mainCityRu: "Якутск",
    land: "A huge cold land in the north-east, on the Lena River.",
    facts: ["Winters in Yakutsk are some of the coldest in any city.", "Sakha and Russian are both official languages."],
    otherLanguage: "Sakha",
    aliases: ["yakutia", "якутия", "sakha", "якутск", "yakutsk"],
    shape: "M22 10h52l12 24v36l-20 16H28L12 48V22z",
  }),
  region({
    slug: "kamchatka",
    name: "Kamchatka Krai",
    nameRu: "Камчатский край",
    latin: "Kamchatsky krai",
    mainCity: "Petropavlovsk-Kamchatsky",
    mainCityRu: "Петропавловск-Камчатский",
    land: "A peninsula of volcanoes, by the Pacific.",
    facts: ["Many volcanoes stand here.", "Bears live by the rivers."],
    placeSlug: "kamchatka",
    aliases: ["kamchatka", "петропавловск-камчатский"],
    shape: "M42 6h16l8 18 4 28-10 30-14-8 2-24-8-22z",
  }),
  region({
    slug: "krasnodar",
    name: "Krasnodar Krai",
    nameRu: "Краснодарский край",
    latin: "Krasnodarsky krai",
    mainCity: "Krasnodar",
    mainCityRu: "Краснодар",
    land: "In the south, by the Black Sea and the Kuban River.",
    facts: ["The land is warmer than Moscow.", "Sochi is a city on the Black Sea."],
    aliases: ["krasnodar", "краснодар", "sochi", "сочи"],
    shape: "M12 36h62l10 14-18 16H20L8 50z",
  }),
  region({
    slug: "kaliningrad-oblast",
    name: "Kaliningrad Oblast",
    nameRu: "Калининградская область",
    latin: "Kaliningradskaya oblast",
    mainCity: "Kaliningrad",
    mainCityRu: "Калининград",
    land: "By the Baltic Sea, between Poland and Lithuania. It is separate from the main land.",
    facts: ["This city was called Königsberg before.", "It is part of Russia, and it does not touch the main land."],
    placeSlug: "kaliningrad",
    aliases: ["kaliningrad", "калининград", "konigsberg", "königsberg"],
    shape: "M18 28h52l8 16-12 22H22L8 46z",
  }),
];

export function getRegion(slug: string) {
  return regions.find((item) => item.slug === slug);
}
