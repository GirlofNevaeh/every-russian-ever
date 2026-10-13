import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CartoonPortrait } from "@/components/cartoon-portrait";
import { SearchBox } from "@/components/search-box";
import { inventions, people, periods, roles, type Period, type Role } from "@/data/people";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/people/")({ component: PeoplePage });

function PeoplePage() {
  const { tx } = useI18n();
  const [role, setRole] = useState<Role | "all">("all");
  const [period, setPeriod] = useState<Period | "all">("all");

  const shown = useMemo(
    () =>
      people.filter(
        (person) =>
          (role === "all" || person.role === role) && (period === "all" || person.period === period),
      ),
    [role, period],
  );

  function roleEmpty(id: Role | "all") {
    return !people.some(
      (person) =>
        (id === "all" || person.role === id) && (period === "all" || person.period === period),
    );
  }

  function periodEmpty(id: Period | "all") {
    return !people.some(
      (person) =>
        (role === "all" || person.role === role) && (id === "all" || person.period === id),
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">{tx("People")}</h1>
      <p className="mt-3 max-w-3xl text-lg">
        {tx("Women and men who made things, wrote, painted, played music, or asked fair questions.")}
      </p>
      <div className="mt-4 max-w-xl">
        <SearchBox />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {roles.map((item) => {
          const empty = roleEmpty(item.id);
          const on = role === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={empty}
              onClick={() => setRole(item.id)}
              className={
                "min-h-11 rounded-md border-2 px-3 font-semibold " +
                (on
                  ? "border-neva bg-neva text-paper"
                  : "border-neva bg-card text-neva disabled:opacity-40")
              }
            >
              {tx(item.label)}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {periods.map((item) => {
          const empty = periodEmpty(item.id);
          const on = period === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={empty}
              onClick={() => setPeriod(item.id)}
              className={
                "min-h-11 rounded-md border-2 px-3 font-semibold " +
                (on
                  ? "border-neva bg-neva text-paper"
                  : "border-neva bg-card text-neva disabled:opacity-40")
              }
            >
              {tx(item.label)}
            </button>
          );
        })}
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {shown.map((person) => (
          <li key={person.slug} className="flex gap-3 rounded-card border border-neva/20 bg-card p-3">
            <div className="w-20 shrink-0">
              <CartoonPortrait slug={person.slug} name={tx(person.name)} />
            </div>
            <div className="min-w-0">
              <Link to="/people/$slug" params={{ slug: person.slug }} className="font-serif text-2xl text-neva no-underline">
                {tx(person.name)}
              </Link>
              <p className="text-ink">
                {person.nameRu} · {person.latin}
              </p>
              <p className="text-ink">{tx(person.years)}</p>
              <p className="mt-1 text-ink">{tx(person.knownFor)}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-serif text-3xl text-neva">{tx("Things they made or found")}</h2>
      <ul className="mt-4 space-y-4">
        {inventions.map((item) => (
          <li key={item.title} className="rounded-card border border-neva/20 bg-card p-4">
            <p className="font-semibold text-neva">{tx(item.title)}</p>
            <p className="mt-1 text-ink">{tx(item.text)}</p>
            <p className="mt-2">
              {item.slugs.map((slug, index) => {
                const person = people.find((entry) => entry.slug === slug);
                if (!person) return null;
                return (
                  <span key={slug}>
                    {index > 0 ? ", " : ""}
                    <Link to="/people/$slug" params={{ slug }} className="underline">
                      {tx(person.name)}
                    </Link>
                  </span>
                );
              })}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
