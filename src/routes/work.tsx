import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/work")({ component: WorkPage });

const bank = [
  ["Москва", "Moscow"],
  ["Байкал", "Baikal"],
  ["Волга", "Volga"],
  ["Санкт-Петербург", "Saint Petersburg"],
  ["Казань", "Kazan"],
  ["Суздаль", "Suzdal"],
  ["Владимир", "Vladimir"],
  ["Кижи", "Kizhi"],
  ["Эльбрус", "Elbrus"],
  ["Камчатка", "Kamchatka"],
  ["Владивосток", "Vladivostok"],
  ["Новосибирск", "Novosibirsk"],
  ["Калининград", "Kaliningrad"],
  ["Ясная Поляна", "Yasnaya Polyana"],
  ["Уральские горы", "Ural Mountains"],
];

const who = ["Leo Tolstoy", "Peter the Great", "Ivan Fyodorov", "Feodor Chaliapin", "Marc Chagall", "Catherine the Great", "Ivan Aivazovsky", "Pavel Tretyakov"];
const where = [
  "Yasnaya Polyana",
  "Saint Petersburg",
  "Moscow",
  "Kazan",
  "Vitebsk, now Belarus",
  "Stettin, now Szczecin in Poland",
  "Feodosia, in Crimea, which is Ukraine",
  "Moscow",
];

const years = ["1991", "1564", "1961", "1703", "1861", "1917"];
const blanks = [
  "The first dated printed book in Moscow",
  "Saint Petersburg begins",
  "Serfdom ends",
  "The tsar steps down",
  "Yuri Gagarin flies",
  "The Soviet Union ends",
];

function WorkPage() {
  const [sheet, setSheet] = useState<"bank" | "match" | "time" | "listen">("bank");
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">Work</h1>
      <p className="mt-3 text-lg">Print a sheet and take it to class.</p>
      <div className="no-print mt-4 flex flex-wrap gap-2">
        {(
          [
            ["bank", "Place words"],
            ["match", "Who and where"],
            ["time", "Timeline"],
            ["listen", "Listening"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSheet(id)}
            className={
              "min-h-11 rounded-md border-2 border-neva px-3 font-semibold " +
              (sheet === id ? "bg-neva text-paper" : "bg-card text-neva")
            }
          >
            {label}
          </button>
        ))}
        <button type="button" onClick={() => window.print()} className="min-h-11 rounded-md bg-banner px-4 font-semibold text-paper">
          Print this sheet
        </button>
      </div>

      {sheet === "bank" ? (
        <section className="mt-6">
          <h2 className="font-serif text-2xl text-neva">Place word bank</h2>
          <p className="mt-2">Use these names in your writing. Each place has a Russian name and an English name.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {bank.map(([ru, en]) => (
              <li key={ru} className="rounded-md bg-card px-3 py-2">
                {ru} · {en}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {sheet === "match" ? (
        <section className="mt-6">
          <h2 className="font-serif text-2xl text-neva">Who and where</h2>
          <p className="mt-2">Draw a line from a person to a place. The two lists are not in the same order.</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ol className="space-y-3">
              {who.map((name) => (
                <li key={name} className="rounded-md bg-card px-3 py-2">
                  {name}
                </li>
              ))}
            </ol>
            <ol className="space-y-3">
              {[where[3], where[0], where[6], where[1], where[7], where[4], where[2], where[5]].map((name, index) => (
                <li key={`${name}-${index}`} className="rounded-md bg-card px-3 py-2">
                  {name}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {sheet === "time" ? (
        <section className="mt-6">
          <h2 className="font-serif text-2xl text-neva">Timeline with blanks</h2>
          <p className="mt-2">Year bank: {years.join(", ")}</p>
          <ol className="mt-4 space-y-3">
            {blanks.map((line) => (
              <li key={line} className="rounded-md bg-card px-3 py-3">
                ________ — {line}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {sheet === "listen" ? (
        <section className="mt-6 space-y-3 text-lg">
          <h2 className="font-serif text-2xl text-neva">Listening</h2>
          <p>The state anthem uses a tune written by Alexander Alexandrov.</p>
          <p>He wrote the tune first for an earlier anthem.</p>
          <p>The words used now were written later.</p>
          <p>People hear the tune at sports and on national days.</p>
        </section>
      ) : null}
    </main>
  );
}
