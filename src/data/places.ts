import { keysFor } from "./search";

export type Place = {
  slug: string;
  name: string;
  nameRu: string;
  latin: string;
  lines: string[];
  x: number;
  y: number;
  keys: string[];
};

function place(input: Omit<Place, "keys"> & { aliases?: string[] }): Place {
  const { aliases = [], ...rest } = input;
  return {
    ...rest,
    keys: keysFor(rest.name, rest.nameRu, rest.latin, rest.slug, ...aliases),
  };
}

export const places: Place[] = [
  place({
    slug: "kremlin",
    name: "Moscow Kremlin",
    nameRu: "Московский Кремль",
    latin: "Moskovsky Kreml",
    x: 30,
    y: 48,
    aliases: ["kremlin", "moscow kremlin", "кремль", "Moscow", "Москва"],
    lines: [
      "The Kremlin is a fortress in the middle of Moscow.",
      "High brick walls and towers stand around palaces and cathedrals.",
      "The president works inside the Kremlin.",
    ],
  }),
  place({
    slug: "basil",
    name: "Saint Basil's Cathedral",
    nameRu: "Собор Василия Блаженного",
    latin: "Sobor Vasiliya Blazhennogo",
    x: 30,
    y: 62,
    aliases: ["cathedral of the intercession", "saint basil", "храм покрова", "покровский собор", "Moscow", "Москва"],
    lines: [
      "This is the Cathedral of the Intercession. Many people call it Saint Basil's.",
      "The colourful domes stand on Red Square.",
      "It was built in the 1500s.",
    ],
  }),
  place({
    slug: "red-square",
    name: "Red Square",
    nameRu: "Красная площадь",
    latin: "Krasnaya Ploshchad",
    x: 42,
    y: 46,
    aliases: ["red square", "Moscow", "Москва"],
    lines: [
      "Red Square is a wide open place beside the Kremlin.",
      "Saint Basil's Cathedral stands at one end.",
      "The name is old. Krasnaya once meant beautiful, as well as red.",
    ],
  }),
  place({
    slug: "hermitage",
    name: "Hermitage and Winter Palace",
    nameRu: "Эрмитаж и Зимний дворец",
    latin: "Ermitazh i Zimny dvorets",
    x: 24,
    y: 28,
    aliases: ["hermitage", "winter palace", "эрмитаж", "зимний дворец"],
    lines: [
      "The Winter Palace stands on the River Neva in Saint Petersburg.",
      "The Hermitage is the great museum inside and beside the palace.",
      "You can see paintings, statues, and treasures from many lands.",
    ],
  }),
  place({
    slug: "peterhof",
    name: "Peterhof",
    nameRu: "Петергоф",
    latin: "Petergof",
    x: 14,
    y: 34,
    aliases: ["peterhof", "petrodvorets"],
    lines: [
      "Peterhof is a palace by the sea, near Saint Petersburg.",
      "Gold fountains run down to the water in summer.",
      "Peter the Great wanted a palace that looked out to the ships.",
    ],
  }),
  place({
    slug: "peter-paul",
    name: "Peter and Paul Fortress",
    nameRu: "Петропавловская крепость",
    latin: "Petropavlovskaya krepost",
    x: 24,
    y: 40,
    aliases: ["peter and paul", "peter paul fortress"],
    lines: [
      "This fortress was begun in 1703, when Saint Petersburg was new.",
      "A tall gold spire rises over the river.",
      "The city grew around this spot.",
    ],
  }),
  place({
    slug: "novgorod",
    name: "Veliky Novgorod",
    nameRu: "Великий Новгород",
    latin: "Veliky Novgorod",
    x: 36,
    y: 32,
    aliases: ["novgorod", "veliky novgorod", "новгород"],
    lines: [
      "Veliky Novgorod is one of the oldest cities in Russia.",
      "Its fortress is called the Detinets.",
      "Traders and icon painters worked here long ago.",
    ],
  }),
  place({
    slug: "suzdal",
    name: "Suzdal",
    nameRu: "Суздаль",
    latin: "Suzdal",
    x: 18,
    y: 56,
    lines: [
      "Suzdal is a small city of churches and wooden houses.",
      "It sits on the River Kamenka, east of Moscow.",
      "The domes are white, gold, and blue.",
    ],
  }),
  place({
    slug: "vladimir",
    name: "Vladimir",
    nameRu: "Владимир",
    latin: "Vladimir",
    x: 18,
    y: 70,
    aliases: ["vladimir russia", "golden gate"],
    lines: [
      "Vladimir is an old city near Suzdal.",
      "The Golden Gate was a tower in the city wall.",
      "White stone cathedrals still stand here.",
    ],
  }),
  place({
    slug: "kazan",
    name: "Kazan Kremlin",
    nameRu: "Казанский Кремль",
    latin: "Kazansky Kreml",
    x: 52,
    y: 52,
    aliases: ["kazan", "казань", "kazan kremlin"],
    lines: [
      "The Kazan Kremlin stands above the River Kazanka, near the Volga.",
      "A mosque and a church share the same hill.",
      "Kazan is the main city of Tatarstan.",
    ],
  }),
  place({
    slug: "lavra",
    name: "Trinity Lavra",
    nameRu: "Троице-Сергиева лавра",
    latin: "Troitse-Sergieva lavra",
    x: 42,
    y: 32,
    aliases: ["sergiev posad", "sergiyev posad", "сергиев посад", "trinity lavra"],
    lines: [
      "The Trinity Lavra is a monastery in Sergiyev Posad.",
      "It is north-east of Moscow.",
      "Andrei Rublev painted here. Pilgrims still come.",
    ],
  }),
  place({
    slug: "kizhi",
    name: "Kizhi",
    nameRu: "Кижи",
    latin: "Kizhi",
    x: 16,
    y: 16,
    lines: [
      "Kizhi is an island in Lake Onega, in Karelia.",
      "The great wooden church was built without nails.",
      "Many domes crowd together on the roof.",
    ],
  }),
  place({
    slug: "yasnaya",
    name: "Yasnaya Polyana",
    nameRu: "Ясная Поляна",
    latin: "Yasnaya Polyana",
    x: 30,
    y: 76,
    aliases: ["yasnaya polyana", "tolstoy house"],
    lines: [
      "Yasnaya Polyana was the home of Leo Tolstoy.",
      "It is a house among birch trees, south of Moscow.",
      "He wrote long novels here.",
    ],
  }),
  place({
    slug: "baikal",
    name: "Lake Baikal",
    nameRu: "Байкал",
    latin: "Baikal",
    x: 78,
    y: 56,
    aliases: ["baikal", "baykal", "lake baikal", "озеро байкал"],
    lines: [
      "Baikal is a lake in Siberia. It is the deepest lake in the world.",
      "The water is very clear, and very cold.",
      "Seals called nerpa live here, far from the sea.",
    ],
  }),
  place({
    slug: "volga",
    name: "River Volga",
    nameRu: "Волга",
    latin: "Volga",
    x: 48,
    y: 66,
    aliases: ["volga", "река волга"],
    lines: [
      "The Volga is a long river in the west of Russia.",
      "It flows south to the Caspian Sea.",
      "Towns such as Kazan stand on its banks. Songs call it Mother Volga.",
    ],
  }),
  place({
    slug: "ural",
    name: "Ural Mountains",
    nameRu: "Уральские горы",
    latin: "Uralskie gory",
    x: 60,
    y: 38,
    aliases: ["ural", "urals", "уральские горы", "уральские"],
    lines: [
      "The Ural mountains run north and south.",
      "People say Europe is on one side and Asia on the other.",
      "They are old mountains, and not very high.",
    ],
  }),
  place({
    slug: "elbrus",
    name: "Elbrus",
    nameRu: "Эльбрус",
    latin: "Elbrus",
    x: 36,
    y: 88,
    aliases: ["mount elbrus", "эльбрус"],
    lines: [
      "Elbrus is the highest mountain in Russia.",
      "It stands in the Caucasus, in the south.",
      "Snow stays on the top even in summer.",
    ],
  }),
  place({
    slug: "kamchatka",
    name: "Kamchatka",
    nameRu: "Камчатка",
    latin: "Kamchatka",
    x: 92,
    y: 42,
    aliases: ["kamchatka"],
    lines: [
      "Kamchatka is a peninsula on the Pacific Ocean.",
      "Volcanoes smoke above the rivers.",
      "Bears come to the rivers when the fish run.",
    ],
  }),
  place({
    slug: "vladivostok",
    name: "Vladivostok",
    nameRu: "Владивосток",
    latin: "Vladivostok",
    x: 86,
    y: 74,
    aliases: ["vladivostok"],
    lines: [
      "Vladivostok is a port on the Pacific.",
      "A long bridge crosses the bay.",
      "Trains from Moscow take many days to arrive.",
    ],
  }),
  place({
    slug: "novosibirsk",
    name: "Novosibirsk",
    nameRu: "Новосибирск",
    latin: "Novosibirsk",
    x: 70,
    y: 48,
    aliases: ["novosibirsk"],
    lines: [
      "Novosibirsk is a large city in Siberia.",
      "It stands on the River Ob.",
      "The opera house is a big dome in the middle of the city.",
    ],
  }),
  place({
    slug: "kaliningrad",
    name: "Kaliningrad",
    nameRu: "Калининград",
    latin: "Kaliningrad",
    x: 6,
    y: 46,
    aliases: ["kaliningrad", "konigsberg", "königsberg", "кенигсберг"],
    lines: [
      "Kaliningrad is part of Russia. It does not touch the mainland.",
      "It sits by the Baltic Sea, between Poland and Lithuania.",
      "This city was called Königsberg before.",
    ],
  }),
  place({
    slug: "wall-of-grief",
    name: "Wall of Grief",
    nameRu: "Стена скорби",
    latin: "Stena skorbi",
    x: 42,
    y: 60,
    aliases: ["wall of grief", "стена скорби", "Moscow", "Москва"],
    lines: [
      "The Wall of Grief is in Moscow.",
      "It is a place to remember people the state hurt.",
    ],
  }),
];

export function getPlace(slug: string) {
  return places.find((item) => item.slug === slug);
}
