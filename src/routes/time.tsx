import { createFileRoute } from "@tanstack/react-router";
import { timeline } from "@/data/timeline";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/time")({ component: TimePage });

function TimePage() {
  const { tx } = useI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">{tx("Time")}</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink">
        {tx("Read from left to right. The oldest time is on the left. Today is on the right.")}
      </p>
      <div className="mt-6 overflow-x-auto pb-4">
        <ol className="flex min-w-max items-stretch gap-3">
          {timeline.map((event) => (
            <li
              key={event.id}
              id={event.id}
              className="flex w-64 shrink-0 flex-col rounded-card border border-neva/20 bg-card p-4 scroll-mt-64"
            >
              <p className="font-semibold text-neva">{tx(event.when)}</p>
              <h2 className="mt-2 font-serif text-xl text-neva">{tx(event.title)}</h2>
              <p className="mt-2 text-base leading-relaxed text-ink">{tx(event.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
