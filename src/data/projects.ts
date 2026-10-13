export type ProjectKind = "individual" | "team";

export type Project = {
  id: string;
  age: string;
  kind: ProjectKind;
  title: string;
  steps: string[];
  need: string;
  done: string;
};

export const ages = [
  "Age 5-6",
  "Age 6-7",
  "Age 7-8",
  "Age 8-9",
  "Age 9-10",
  "Age 10-11",
  "Age 11-12",
] as const;

export const projects: Project[] = [
  {
    id: "5-draw",
    age: "Age 5-6",
    kind: "individual",
    title: "Draw the Volga",
    steps: [
      "Open the Places page and find the River Volga.",
      "Draw the river on paper.",
      "Say Волга and Volga out loud.",
    ],
    need: "Paper and crayons.",
    done: "You can say both names and show your drawing.",
  },
  {
    id: "5-bird",
    age: "Age 5-6",
    kind: "team",
    title: "A paper Firebird",
    steps: [
      "Read the Beliefs page together.",
      "Draw one bright bird as a team.",
      "Tell the class that the Firebird is a story, not the news.",
    ],
    need: "A large sheet of paper and crayons.",
    done: "The class has heard that the Firebird is a story.",
  },
  {
    id: "6-baikal",
    age: "Age 6-7",
    kind: "individual",
    title: "Say Baikal",
    steps: [
      "Look at Lake Baikal on the Places page.",
      "Draw the lake and the hills.",
      "Say Байкал and Baikal.",
    ],
    need: "Paper and pencils.",
    done: "You have a drawing, and you can say both names.",
  },
  {
    id: "6-kremlin",
    age: "Age 6-7",
    kind: "team",
    title: "A paper fortress",
    steps: [
      "Look at the Moscow Kremlin.",
      "Build a tower from folded paper.",
      "Say Московский Кремль and Moscow Kremlin.",
    ],
    need: "Paper, tape, and crayons.",
    done: "The tower stands, and the team can say both names.",
  },
  {
    id: "7-person",
    age: "Age 7-8",
    kind: "individual",
    title: "One person, two names",
    steps: [
      "Choose one person on the People page.",
      "Say the English name and the Russian name.",
      "Say one thing that person made or did.",
    ],
    need: "The People page.",
    done: "You can say both names and one true fact.",
  },
  {
    id: "7-dates",
    age: "Age 7-8",
    kind: "team",
    title: "Three dates",
    steps: [
      "On the Time page, find 1703, 1861, and 1961.",
      "Make a paper chain with one date on each link.",
      "Say what happened in each year.",
    ],
    need: "Paper strips and a pencil.",
    done: "The chain has three true dates in order.",
  },
  {
    id: "8-place",
    age: "Age 8-9",
    kind: "individual",
    title: "Three sentences about a place",
    steps: [
      "Choose a place on this site.",
      "Write three short sentences.",
      "Use the Russian name once and the English name once.",
    ],
    need: "Paper and a pencil.",
    done: "Your three sentences use both names.",
  },
  {
    id: "8-match",
    age: "Age 8-9",
    kind: "team",
    title: "Who lived where",
    steps: [
      "Pick five people from the People page.",
      "Find a place linked to each one.",
      "Make a poster that shows the person and the place.",
    ],
    need: "A large sheet and pens.",
    done: "The poster shows five true pairs.",
  },
  {
    id: "9-region",
    age: "Age 9-10",
    kind: "individual",
    title: "A small region book",
    steps: [
      "Choose one region.",
      "Write the Russian name, the English name, and the main city.",
      "Add the two facts from that region's page.",
    ],
    need: "Folded paper for a little book.",
    done: "The book has both names, the main city, and two facts.",
  },
  {
    id: "9-museum",
    age: "Age 9-10",
    kind: "team",
    title: "An invention table",
    steps: [
      "Choose three things from the list on the People page.",
      "Make a card for each one, with the person's name.",
      "If credit is shared, write the other names too.",
    ],
    need: "Cards, pens, and a table.",
    done: "A visitor can see three inventions and who shares the credit.",
  },
  {
    id: "10-days",
    age: "Age 10-11",
    kind: "individual",
    title: "Two special days",
    steps: [
      "Read the Beliefs page.",
      "Choose two ways families mark a special day.",
      "Write a short kind page. Do not mock anyone's faith.",
    ],
    need: "Paper and a pencil.",
    done: "You have a kind page about two customs.",
  },
  {
    id: "10-quiz",
    age: "Age 10-11",
    kind: "team",
    title: "Eight fair questions",
    steps: [
      "Write eight questions from this site only.",
      "Ask who, where, when, or what someone made.",
      "Ask them aloud. Agree on the answer from the site before the next question.",
    ],
    need: "Cards for the questions.",
    done: "The team has asked all eight, using only this site.",
  },
  {
    id: "11-compare",
    age: "Age 11-12",
    kind: "individual",
    title: "Two places, both names",
    steps: [
      "Choose two places on this site.",
      "Write a short comparison.",
      "Use the Russian name and the English name for each place. Say one likeness and one difference.",
    ],
    need: "Paper and a pencil.",
    done: "Both places appear with both names, a likeness, and a difference.",
  },
  {
    id: "11-regions",
    age: "Age 11-12",
    kind: "team",
    title: "Two regions",
    steps: [
      "Choose two regions.",
      "Write one short page together.",
      "Use the Russian name and the English name for each. Say that Russia has many more regions.",
    ],
    need: "One shared page and pens.",
    done: "The page compares two regions and says Russia has many more.",
  },
];
