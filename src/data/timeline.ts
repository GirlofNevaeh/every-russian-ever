export type TimelineEvent = {
  id: string;
  when: string;
  title: string;
  text: string;
};

export const timeline: TimelineEvent[] = [
  {
    id: "first-people",
    when: "Long ago",
    title: "First people",
    text: "People have lived on these lands for a very long time. We are not sure what the people at the very old graves believed.",
  },
  {
    id: "kievan-rus",
    when: "About 800–1200",
    title: "Kievan Rus",
    text: "Kievan Rus was a land of towns and trade. Its famous city was Kyiv, which is in Ukraine today.",
  },
  {
    id: "moscow-grows",
    when: "1100s–1500s",
    title: "Moscow grows",
    text: "Moscow grew from a small town into the main city of the Russian lands.",
  },
  {
    id: "book-1564",
    when: "1564",
    title: "A dated printed book",
    text: "In 1564 Ivan Fyodorov printed a dated book in Moscow. Printing was already used in China, Korea, and Western Europe.",
  },
  {
    id: "petersburg-1703",
    when: "1703",
    title: "Saint Petersburg",
    text: "In 1703 Peter the Great began Saint Petersburg. The new city was hard on the workers.",
  },
  {
    id: "year-1812",
    when: "1812",
    title: "An army reaches Moscow",
    text: "In 1812 an army from France reached Moscow.",
  },
  {
    id: "year-1861",
    when: "1861",
    title: "Serfdom ends",
    text: "In 1861 serfdom ended. The people who had been tied to the land were freed.",
  },
  {
    id: "year-1917",
    when: "1917",
    title: "The tsar steps down",
    text: "In 1917 the tsar stepped down.",
  },
  {
    id: "after-1917",
    when: "After 1917",
    title: "Rulers not freely chosen",
    text: "After 1917, people could not freely choose their rulers, and many people were hurt. That was wrong.",
  },
  {
    id: "years-1941",
    when: "1941–1945",
    title: "A hard war",
    text: "From 1941 to 1945 Germany's army entered. Many families were hurt. The war ended in 1945. The city of Volgograd was called Stalingrad then.",
  },
  {
    id: "sputnik",
    when: "1957",
    title: "Sputnik",
    text: "In 1957 a team sent up Sputnik, the first satellite to orbit the Earth.",
  },
  {
    id: "gagarin",
    when: "1961",
    title: "Gagarin flies",
    text: "In 1961 Yuri Gagarin flew in space. He did not build the craft alone.",
  },
  {
    id: "year-1991",
    when: "1991",
    title: "The Soviet Union ends",
    text: "In 1991 the Soviet Union ended. From 1922 to 1991 Russia had been one part of that union. The other countries that came out of it are not Russia.",
  },
  {
    id: "year-2022",
    when: "2022",
    title: "Ukraine",
    text: "In 2022 Russia's army went into Ukraine. Ukraine is a different country. Many families were hurt.",
  },
];
