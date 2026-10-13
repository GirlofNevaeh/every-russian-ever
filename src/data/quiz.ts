import { people } from "./people";
import { places } from "./places";
import { regions } from "./regions";

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  tieBreak?: boolean;
};

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(items: T[], seed: string) {
  const copy = [...items];
  let h = hash(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    const j = h % (i + 1);
    const swap = copy[i];
    copy[i] = copy[j];
    copy[j] = swap;
  }
  return copy;
}

function mc(
  id: string,
  prompt: string,
  correct: string,
  wrongs: string[],
  tieBreak = false,
): QuizQuestion {
  const pool = [correct];
  for (const wrong of wrongs) {
    if (wrong && wrong !== correct && !pool.includes(wrong)) pool.push(wrong);
    if (pool.length === 4) break;
  }
  const fillers = ["The River Lena", "The city of Yakutsk", "The year 1703", "A wooden church"];
  for (const filler of fillers) {
    if (pool.length === 4) break;
    if (!pool.includes(filler) && filler !== correct) pool.push(filler);
  }
  const choices = shuffle(pool.slice(0, 4), id);
  return { id, prompt, choices, answer: choices.indexOf(correct), tieBreak };
}

const core: QuizQuestion[] = [
  mc("cap", "What is the capital of Russia?", "Moscow", ["Kazan", "Vladivostok", "Kaliningrad"], true),
  mc("baikal-what", "What is Baikal?", "A lake", ["A mountain", "A sea", "A city"], true),
  mc("gagarin-year", "In what year did Yuri Gagarin fly in space?", "1961", ["1957", "1991", "1861"], true),
  mc("print-before", "Was printing already used before Moscow's first dated book?", "Yes. It was already used in China, Korea, and Western Europe.", ["No. Moscow was first in the world.", "Only in Moscow.", "We are not sure printing existed."], true),
  mc("ukraine", "Which sentence is true?", "Ukraine is a different country.", ["Ukraine is a city in Russia.", "Kyiv is the capital of Russia.", "Belarus is a region of Moscow."], true),
  mc("belarus", "Which sentence is true?", "Belarus is a different country.", ["Belarus is a district of Saint Petersburg.", "Belarus is the Russian name for Moscow.", "Belarus is a lake."]),
  mc("soviet-end", "In what year did the Soviet Union end?", "1991", ["1917", "1945", "1703"], true),
  mc("const", "What is the constitution of 1993?", "The set of rules", ["A river", "A ballet", "A mountain"]),
  mc("parliament", "What is the parliament of Russia called?", "The Federal Assembly", ["The Winter Palace", "The Kremlin choir", "The Volga council"]),
  mc("president", "Who is the head of state in Russia?", "The president", ["The mayor of Kazan", "A composer", "The head of the Hermitage"]),
  mc("language", "Which language is used for the whole country?", "Russian", ["Only Tatar", "Only Sakha", "Only Karelian"]),
  mc("christmas", "When do many families in Russia mark Christmas?", "In January", ["Only in July", "They never mark it", "Only on Mondays"]),
  mc("firebird", "The Firebird is…", "a story, not the news", ["a real bird in the Kremlin", "a volcano", "a kind of train"]),
  mc("baba", "Baba Yaga is…", "a story, not the news", ["a president", "a lake", "a printed book"]),
  mc("serf", "In what year did serfdom end?", "1861", ["1564", "1812", "1957"]),
  mc("tsar", "What happened in 1917?", "The tsar stepped down.", ["Saint Petersburg was begun.", "Gagarin flew.", "Sputnik went up."]),
  mc("spb", "In what year was Saint Petersburg begun?", "1703", ["1564", "1961", "1991"]),
  mc("sputnik", "What happened in 1957?", "A team sent up Sputnik.", ["Serfdom ended.", "The tsar stepped down.", "The constitution of 1993 was written."]),
  mc("war-end", "The war of 1941 to 1945 ended in which year?", "1945", ["1812", "1917", "2022"]),
  mc("1812", "What happened in 1812?", "An army from France reached Moscow.", ["The first dated book was printed.", "Baikal was dug by hand.", "The Soviet Union ended."]),
  mc("kalin-sep", "Where is Kaliningrad?", "It is part of Russia and separate from the main land.", ["It is attached to Moscow.", "It is in Kamchatka.", "It is a lake."]),
  mc("konigs", "What was Kaliningrad called before?", "Königsberg", ["Leningrad", "Novgorod", "Yakutsk"]),
  mc("elbrus", "What is the highest mountain in Russia?", "Elbrus", ["The Urals", "Baikal", "Kizhi"], true),
  mc("deep", "Which lake is the deepest in the world?", "Baikal", ["Onega", "Ladoga", "The Caspian Sea"]),
  mc("volga-what", "What is the Volga?", "A river", ["A mountain", "A composer", "A fortress"]),
  mc("kyiv", "Kyiv is…", "a city in Ukraine today", ["the capital of Russia", "a district of Kazan", "a lake in Siberia"]),
  mc("rus", "The famous city of Kievan Rus was…", "Kyiv, which is in Ukraine today", ["Vladivostok", "Kaliningrad", "Yakutsk"]),
  mc("valentina", "Who was the first woman in space?", "Valentina Tereshkova", ["Anna Pavlova", "Sofia Kovalevskaya", "Anna Akhmatova"]),
  mc("sveta", "Who was the first woman to walk in space?", "Svetlana Savitskaya", ["Maya Plisetskaya", "Irina Rodnina", "Agniya Barto"]),
  mc("meyer", "Who else found a pattern in the elements, besides Mendeleev?", "Julius Lothar Meyer", ["Leo Tolstoy", "Ivan Krylov", "Marc Chagall"]),
  mc("marconi", "Who else belongs in the radio story, besides Alexander Popov?", "Guglielmo Marconi", ["Ivan Shishkin", "Lev Yashin", "Anna Golubkina"]),
  mc("edison", "Who else belongs in the lamp story, besides Alexander Lodygin?", "Joseph Swan and Thomas Edison", ["Only Lodygin", "Baba Yaga", "The Firebird"]),
  mc("farnsworth", "Who else belongs in the television story, besides Vladimir Zworykin?", "Philo Farnsworth", ["Pavel Tretyakov", "Ivan Bunin", "Galina Ulanova"]),
  mc("gauss", "Who else worked on Lobachevsky's kind of geometry?", "János Bolyai and Carl Friedrich Gauss", ["Only Lobachevsky", "Feodor Chaliapin", "Lev Yashin"]),
  mc("ehrlich", "Ilya Mechnikov shared a Nobel Prize with whom?", "Paul Ehrlich", ["Leo Tolstoy", "Peter the Great", "Anna Pavlova"]),
  mc("pavlov-nobel", "Ivan Pavlov's Nobel Prize was for…", "digestion", ["a ballet", "a printed book", "chess"]),
  mc("perelman-prize", "What did Grigori Perelman do about the prizes?", "He would not take them.", ["He took every prize.", "He gave them to a tsar.", "There was no maths problem."]),
  mc("graphene-where", "Where did Geim and Novoselov later work?", "In Britain", ["Only in Kamchatka", "In Königsberg in 1564", "On Lake Baikal"]),
  mc("moskva", "What is the Russian name of Moscow?", "Москва", ["Казань", "Байкал", "Волга"], true),
  mc("baikal-ru", "What is the Russian name of Lake Baikal?", "Байкал", ["Москва", "Казань", "Кижи"]),
  mc("volga-ru", "What is the Russian name of the Volga?", "Волга", ["Урал", "Эльбрус", "Кижи"]),
  mc("kazan-ru", "What is the Russian name of Kazan?", "Казань", ["Москва", "Байкал", "Суздаль"]),
  mc("tatar-ru", "What is the Russian name of the Republic of Tatarstan?", "Республика Татарстан", ["Республика Саха", "Московская область", "Камчатский край"]),
  mc("sakha-ru", "What is the Russian name of the Sakha Republic?", "Республика Саха (Якутия)", ["Республика Карелия", "Краснодарский край", "Приморский край"]),
  mc("kalin-ru", "What is the Russian name of Kaliningrad?", "Калининград", ["Владивосток", "Новосибирск", "Суздаль"]),
  mc("peter-city", "Who began Saint Petersburg?", "Peter the Great", ["Ivan Fyodorov", "Leo Tolstoy", "Yuri Gagarin"]),
  mc("book-year", "In what year was the first dated printed book made in Moscow?", "1564", ["1703", "1861", "1961"]),
  mc("hermitage-where", "Where is the Hermitage?", "In Saint Petersburg", ["In Yakutsk", "In Kaliningrad only", "On Kamchatka"]),
  mc("kizhi-where", "Kizhi is in which land?", "Karelia", ["Krasnodar Krai", "Kaliningrad Oblast", "the middle of Moscow"]),
  mc("grief", "Where is the Wall of Grief?", "In Moscow", ["On Elbrus", "In Kamchatka", "On Kizhi"]),
  mc("yasnaya-who", "Who lived at Yasnaya Polyana?", "Leo Tolstoy", ["Ivan Aivazovsky", "Yuri Gagarin", "Marc Chagall"]),
  mc("crimea-born", "Ivan Aivazovsky was born in Feodosia. Where is that?", "In Crimea, which is Ukraine", ["In the Moscow Kremlin", "In Yakutsk", "In Kaliningrad"]),
  mc("gorbachev-q", "Mikhail Gorbachev led when…", "the Soviet Union ended in 1991", ["Saint Petersburg was begun", "the first book was printed", "serfdom began"]),
  mc("choose", "After 1917, could people freely choose their rulers?", "No. That was wrong.", ["Yes, every year", "Only children could", "Only painters could"]),
  mc("republic-lang", "Many republics in Russia…", "also use their own languages", ["have no languages", "use only English", "forbid songs"]),
  mc("tatar-lang", "Which two languages are official in Tatarstan?", "Tatar and Russian", ["Only French", "Only Japanese", "Sakha and English"]),
  mc("sakha-lang", "Which two languages are official in the Sakha Republic?", "Sakha and Russian", ["Only German", "Only Tatar", "Karelian and Japanese"]),
  mc("graves", "What did people at the very old graves believe?", "We are not sure.", ["They all played chess.", "They all lived in Moscow.", "They printed books."]),
  mc("anthem", "Who wrote the tune used for the state anthem?", "Alexander Alexandrov", ["Leo Tolstoy", "Ivan Shishkin", "Lev Yashin"]),
  mc("anthem-words", "The words of the anthem used now were…", "written later", ["written by a river", "never heard", "printed in 1564"]),
  mc("novosib", "Novosibirsk is…", "a large city in Siberia", ["a lake", "an island church", "the capital"]),
  mc("vladi", "Vladivostok is…", "a port on the Pacific", ["a town in the Moscow Kremlin", "a ballet", "a maths proof"]),
  mc("kam-vol", "Kamchatka is known for…", "volcanoes", ["being the capital", "a printed book in 1564", "the Hermitage"]),
  mc("urals-where", "The Ural mountains are…", "old mountains between the European and Asian sides", ["the highest mountains in Russia", "a sea", "a ballet company"]),
  mc("red", "Red Square is in…", "Moscow", ["Kamchatka", "Yakutsk", "Kizhi"]),
  mc("basil-where", "Saint Basil's Cathedral stands…", "on Red Square", ["on Lake Baikal", "in Yakutsk", "in Karelia only"]),
  mc("fortress", "The Peter and Paul Fortress is in…", "Saint Petersburg", ["Irkutsk", "Krasnoyarsk", "the Sakha Republic"]),
  mc("peterhof-where", "Peterhof is…", "a palace near Saint Petersburg", ["a lake in Siberia", "a volcano", "a chess prize"]),
  mc("lavra-where", "The Trinity Lavra is in…", "Sergiyev Posad", ["Vladivostok", "Kaliningrad", "Kamchatka"]),
  mc("suzdal-what", "Suzdal is…", "an old town of churches", ["a Pacific port", "a peninsula of volcanoes", "a goalkeeper"]),
  mc("vlad-gate", "Vladimir is known for…", "the Golden Gate and white stone cathedrals", ["being on the Pacific", "graphene", "pair skating"]),
  mc("novgorod-old", "Veliky Novgorod is…", "one of the oldest cities in Russia", ["a new city begun in 1961", "a mountain", "an anthem"]),
  mc("winter", "The Winter Palace is part of…", "the Hermitage", ["Lake Baikal", "the Sakha Republic", "Kizhi"]),
  mc("families", "Many families in Russia today are…", "Christian, Muslim, Buddhist, Jewish, or of no religion", ["all of one faith only", "forbidden to have a faith", "only storytellers"]),
  mc("muslim", "Muslim people have lived in these lands…", "for many centuries, including in Tatarstan and the Caucasus", ["only since 1991", "never", "only in Kamchatka's volcanoes"]),
  mc("buddhist", "Buddhist people have lived for many centuries in…", "Buryatia and Kalmykia", ["only in Red Square", "only in 1564", "only in chess clubs"]),
  mc("jewish", "Jewish people have lived in these towns…", "for many centuries", ["never", "only on Elbrus", "only since Sputnik"]),
  mc("easter", "At Easter, many families…", "colour eggs and bake a tall sweet bread", ["close every river", "print the first book", "move Kaliningrad"]),
  mc("more-regions", "Does this site list every region of Russia?", "No. Russia has many more regions.", ["Yes. There are only two.", "Russia has no regions.", "Only Kaliningrad is a region."]),
  mc("year1", "In Russia, children usually start Year 1 at about…", "age 7", ["age 3", "age 12", "age 18"]),
  mc("age56", "Age 5–6 on this site is…", "before school", ["the last year of university", "only for teachers", "a war"]),
  mc("shared-space", "Did Yuri Gagarin build his spacecraft alone?", "No. A team did the work.", ["Yes. He built it in a shed.", "He did not fly.", "He printed it."]),
  mc("popov-alone", "Did Alexander Popov invent radio alone?", "No. Guglielmo Marconi also belongs in the story.", ["Yes. Nobody else did.", "Radio is a lake.", "We are not sure radio exists."]),
  mc("fyodorov-first-world", "Was Moscow's 1564 book the first printed book in the world?", "No. Printing was already used in China, Korea, and Western Europe.", ["Yes.", "Printing was invented in 1961.", "Books cannot be printed."]),
  mc("petersburg-names", "Saint Petersburg was also called…", "Petrograd, and then Leningrad. Those are old names.", ["Kyiv", "It was always called Yakutsk.", "Baikal"]),
  mc("volgograd", "The city of Volgograd was once called…", "Stalingrad", ["Novgorod", "Kizhi", "Peterhof"]),
  mc("rules-hurt", "When people could not freely choose their rulers…", "many people were hurt. That was wrong.", ["everyone was fine", "only rivers were hurt", "it was a ballet"]),
  mc("2022", "In 2022, Russia's army went into…", "Ukraine, a different country", ["Lake Baikal", "the Hermitage's paintings", "a maths problem"]),
  mc("assembly-where", "Where does the Federal Assembly meet?", "In Moscow", ["In Kizhi", "On Elbrus", "In Britain"]),
  mc("home-ages", "This history is for ages…", "5 to 12", ["only adults", "only age 2", "only age 18"]),
  mc("north", "On the map, which way is north?", "The top", ["The bottom", "Only the left sea", "Nowhere"]),
  mc("nerpa", "What lives in Lake Baikal?", "Seals called nerpa", ["Camels only", "A printing press", "The Winter Palace"]),
  mc("kizhi-nails", "The great wooden church at Kizhi was built…", "without nails", ["from spaceships", "in 2022", "under the sea"]),
  mc("ob", "Novosibirsk stands on which river?", "The Ob", ["The Neva only", "The Moscow River only", "No river"]),
  mc("angara", "Which river flows out of Lake Baikal?", "The Angara", ["The Neva", "The Kuban", "None"]),
  mc("sochi", "Sochi is…", "a city on the Black Sea, in Krasnodar Krai", ["the capital", "in the Sakha Republic", "a composer"]),
  mc("yenisei", "The Yenisei River flows…", "north to the Arctic", ["up Elbrus", "into the Kremlin", "to the Moon"]),
  mc("cold", "Yakutsk is known for…", "very cold winters", ["being a hot desert", "the Hermitage", "Swan Lake only"]),
  mc("tatar-mosque", "In the Kazan Kremlin you can see…", "a mosque and a church side by side", ["only a volcano", "the Pacific", "Kizhi's wooden church"]),
];

const personQuestions = people.map((person, index) => {
  const wrongs = people
    .filter((other) => other.slug !== person.slug && other.role !== person.role)
    .slice(index % 5, index % 5 + 6)
    .map((other) => other.knownFor);
  return mc(`who-${person.slug}`, `What is ${person.name} known for?`, person.knownFor, wrongs);
});

const nameQuestions = people.slice(0, 28).map((person) => {
  const wrongs = people
    .filter((other) => other.slug !== person.slug)
    .slice(0, 3)
    .map((other) => other.nameRu);
  return mc(`ru-${person.slug}`, `What is the Russian name of ${person.name}?`, person.nameRu, wrongs);
});

const placeQuestions = places.slice(0, 16).map((place) =>
  mc(
    `place-${place.slug}`,
    `What is the Russian name of ${place.name}?`,
    place.nameRu,
    places.filter((other) => other.slug !== place.slug).slice(0, 3).map((other) => other.nameRu),
  ),
);

const regionQuestions = regions.slice(0, 12).map((region) =>
  mc(
    `region-${region.slug}`,
    `What is the main city of ${region.name}?`,
    region.mainCity,
    ["Yakutsk", "Kaliningrad", "Petropavlovsk-Kamchatsky", "Krasnoyarsk"].filter((city) => city !== region.mainCity),
  ),
);

const extra = [
  mc("pushkin-tale", "Alexander Pushkin wrote…", "poems, tales, and Eugene Onegin", ["a table of the elements", "a helicopter", "a chess rulebook"]),
  mc("chekhov-job", "Anton Chekhov was a writer and also…", "a doctor", ["a goalkeeper", "a volcano", "a tsar"]),
  mc("repin-born", "Ilya Repin was born in Chuhuiv, which is now in…", "Ukraine", ["Kamchatka", "Britain", "the Kremlin wall"]),
  mc("chagall-born", "Marc Chagall was born in Vitebsk, now in…", "Belarus", ["the Pacific", "Sweden", "Karelia's church"]),
  mc("catherine-born", "Catherine the Great was born in Stettin, now Szczecin in…", "Poland", ["Kazan", "Yakutsk", "Kamchatka"]),
  mc("malevich-born", "Kazimir Malevich was born near Kyiv, now in…", "Ukraine", ["Britain", "the Urals only", "Lake Baikal"]),
  mc("sikorsky-born", "Igor Sikorsky was born in Kyiv, now in…", "Ukraine", ["Kaliningrad", "Sweden", "a ballet"]),
  mc("kasparov-born", "Garry Kasparov was born in Baku, now in…", "Azerbaijan", ["France", "the Hermitage", "Kizhi"]),
  mc("mandelstam-born", "Osip Mandelstam was born in Warsaw, now in…", "Poland", ["Kamchatka", "the Bolshoi", "a seed bank"]),
  mc("kov-sweden", "Sofia Kovalevskaya became a professor in…", "Sweden", ["Kamchatka", "a volcano", "Red Square's fountain"]),
  mc("team-space", "Valentina Tereshkova flew in space. Who did the work of the flight?", "A team", ["She did every job alone", "A story firebird", "A chess champion"]),
  mc("korolev-team", "Sergei Korolev…", "led the team that built the spacecraft", ["painted Swan Lake", "wrote fables", "kept goal"]),
  mc("rublev-icon", "Andrei Rublev is known for…", "icons, including the Trinity", ["the periodic table", "pair skating", "a Pacific port"]),
  mc("dashkova-dict", "Yekaterina Dashkova helped lead…", "a dictionary. Many scholars worked on it.", ["a volcano", "the anthem words printed here", "a football team"]),
  mc("vavilov-seeds", "Nikolai Vavilov…", "saved seeds and would not give up his science", ["invented radio alone", "built Saint Basil's", "wrote Swan Lake"]),
  mc("shost-watch", "What is true about Dmitri Shostakovich?", "The state watched his music.", ["He printed the first book.", "He was a lake.", "He ruled in 1703."]),
  mc("brodsky-leave", "Joseph Brodsky…", "was forced to leave", ["built the Kremlin", "discovered Baikal", "ended serfdom"]),
  mc("pasternak-book", "The state would not print which book at home?", "Doctor Zhivago", ["The periodic table", "Swan Lake", "A map of Kizhi"]),
  mc("nureyev-leave", "Rudolf Nureyev…", "left and danced in other countries", ["printed books in 1564", "was a mountain", "ended the Soviet Union"]),
  mc("rach-leave", "Sergei Rachmaninoff…", "left after 1917 and later lived in America", ["never wrote music", "painted only icons", "was a river"]),
  mc("glinka-opera", "Mikhail Glinka wrote…", "some of the first famous Russian operas", ["the periodic table", "a seed bank", "graphene"]),
  mc("prokofiev-wolf", "Peter and the Wolf helps children…", "hear each instrument", ["memorise the anthem words", "build a rocket alone", "end serfdom"]),
  mc("tretyakov-gift", "Pavel Tretyakov gave his paintings…", "to Moscow", ["to a volcano", "to the Moon", "to Baba Yaga"]),
  mc("chaliapin-voice", "Feodor Chaliapin was…", "a singer with a deep voice", ["a lake", "a fortress", "a maths proof"]),
  mc("barto-poems", "Agniya Barto wrote…", "poems for children", ["the constitution", "a helicopter", "the Golden Gate"]),
  mc("krylov-fables", "Ivan Krylov wrote…", "fables", ["graphene papers", "spacewalks", "the Kremlin walls"]),
  mc("yashin-job", "Lev Yashin was…", "a goalkeeper", ["a printer in 1564", "a volcano", "an icon painter"]),
  mc("rodnina-ice", "Irina Rodnina is known for…", "pair skating", ["printing the Apostol", "building Peterhof", "finding graphene alone"]),
  mc("karpov-chess", "Anatoly Karpov was…", "a world chess champion", ["a river", "a cathedral", "a seed collector"]),
  mc("leningrad-now", "The city once called Leningrad is now called…", "Saint Petersburg", ["Kyiv", "Baikal", "Elbrus"]),
  mc("petrograd-now", "Petrograd is an old name for…", "Saint Petersburg", ["Kazan", "the Volga", "graphene"]),
  mc("highest-not-ural", "Are the Ural mountains the highest in Russia?", "No. Elbrus is higher.", ["Yes.", "They are a sea.", "They are in Poland."]),
  mc("federal", "The Federal Assembly is…", "the parliament", ["a ballet", "a lake", "a folk tale"]),
  mc("capital-ru", "Москва is the Russian name of…", "Moscow", ["Baikal", "Elbrus", "Kizhi"]),
  mc("baikal-en", "Байкал is the Russian name of…", "Baikal", ["the Kremlin", "Swan Lake", "the anthem"]),
  mc("fair-credit", "If other people shared an invention, this site…", "says so", ["hides them", "gives one person all the credit", "turns it into a story"]),
  mc("stories", "On the Beliefs page, the Firebird and Baba Yaga are…", "stories, not the news", ["today's rulers", "maps of Ukraine", "a kind of boat"]),
  mc("jan-christmas", "Many families mark Christmas in January because…", "that is their church calendar", ["summer is warmer", "the Volga freezes the date", "books say so in 1564 only"]),
  mc("no-crimea-map", "Crimea is…", "in Ukraine", ["the capital of Russia", "a district of Yakutsk", "part of Kaliningrad"]),
  mc("donetsk-not", "Donetsk, Luhansk, Zaporizhzhia, and Kherson are…", "in Ukraine", ["lakes in Karelia", "districts of Moscow", "islands at Kizhi"]),
  mc("kuril", "Japan and Russia…", "do not agree about the southern Kuril Islands", ["share one capital", "both rule Kazan", "printed the Apostol together"]),
  mc("belong", "Children in Russia who speak another language at home…", "belong in today's Russia", ["must leave", "cannot read this site", "are not real"]),
  mc("union-part", "From 1922 to 1991, Russia was…", "one part of the Soviet Union", ["the only country on Earth", "a city in Ukraine", "called Kizhi"]),
  mc("other-countries", "The other countries that came out of the Soviet Union…", "are not Russia", ["are all districts of Moscow", "are lakes", "are the same as the Kremlin"]),
  mc("hard-city", "When Saint Petersburg was new…", "the work was hard on the workers", ["nobody worked", "it was only a painting", "it was in Kamchatka"]),
  mc("sakharov-order", "What did Andrei Sakharov do?", "He worked on a weapon, then spoke for people's rights.", ["He painted the sea.", "He wrote fables.", "He kept goal."]),
  mc("gagarin-not-alone", "Yuri Gagarin…", "flew. He did not build the craft alone.", ["invented radio alone", "printed the Apostol", "built Elbrus"]),
  mc("wall-sentence", "The Wall of Grief is…", "a place to remember people the state hurt", ["a sports prize", "a volcano", "a children's poem"]),
  mc("serf-free", "In 1861…", "serfdom ended", ["the Soviet Union began", "Gagarin flew", "graphene was found"]),
  mc("france-moscow", "In 1812…", "an army from France reached Moscow", ["Baikal dried up", "the anthem was a river", "Kizhi moved to Kazan"]),
];

const all = [...core, ...personQuestions, ...nameQuestions, ...placeQuestions, ...regionQuestions, ...extra];

const seen = new Set<string>();
const unique: QuizQuestion[] = [];
for (const question of all) {
  if (seen.has(question.prompt)) continue;
  seen.add(question.prompt);
  unique.push(question);
}

export const questions: QuizQuestion[] = unique.slice(0, 250);

export const QUIZ_LENGTH = questions.length;
