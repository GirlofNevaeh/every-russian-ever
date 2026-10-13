import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { isFullName } from "@/data/names";

export function SearchBox({ initial = "" }: { initial?: string }) {
  const navigate = useNavigate();
  const [text, setText] = useState(initial);
  const [ready, setReady] = useState<string | null>(null);

  function finish(value: string, enter: boolean) {
    const trimmed = value.trim();
    setText(value);
    if (!trimmed) {
      setReady(null);
      return;
    }
    if (enter || isFullName(trimmed)) setReady(trimmed);
    else setReady(null);
  }

  function send(words: string) {
    void navigate({ to: "/search", search: { q: words } });
  }

  return (
    <div className="no-print">
      <label className="block text-base font-semibold text-neva" htmlFor="site-search">
        Search
      </label>
      <input
        id="site-search"
        value={text}
        onChange={(event) => finish(event.target.value, false)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          const trimmed = text.trim();
          if (!trimmed) return;
          if (ready === trimmed) send(trimmed);
          else finish(text, true);
        }}
        className="mt-2 min-h-11 w-full rounded-md border-2 border-neva bg-card px-3 text-lg text-ink"
        placeholder="Type a name, then press Enter"
        autoComplete="off"
      />
      {ready ? (
        <div className="mt-3 rounded-md border-2 border-neva bg-card p-3">
          <p className="font-mono text-base text-ink">
            <span className="text-neva">search</span> {ready}
          </p>
          <button
            type="button"
            onClick={() => send(ready)}
            className="mt-3 inline-flex min-h-11 items-center rounded-md bg-banner px-4 font-semibold text-paper"
          >
            Send
          </button>
        </div>
      ) : null}
    </div>
  );
}
