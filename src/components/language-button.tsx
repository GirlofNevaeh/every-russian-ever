import { useEffect, useRef, useState } from "react";
import { locales } from "@/i18n/locales";
import { useI18n } from "@/i18n/provider";

export function LanguageButton() {
  const { locale, setLocale, tx } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = locales.find((item) => item.id === locale) ?? locales[0];

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-50 ml-auto shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={tx("Language")}
        className="h-9 max-w-full rounded-full border-2 border-paper bg-paper px-3 text-xs font-semibold text-neva sm:text-sm"
        onClick={() => setOpen((value) => !value)}
      >
        {current.label}
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={tx("Language")}
          className="absolute right-0 z-50 mt-1 max-h-[70vh] w-48 overflow-y-auto rounded-md border-2 border-neva bg-paper p-1 text-ink shadow"
        >
          {locales.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={item.id === locale}
                className={
                  "block min-h-10 w-full rounded-md px-3 text-left text-sm font-semibold " +
                  (item.id === locale ? "bg-neva text-paper" : "text-ink")
                }
                onClick={() => {
                  setLocale(item.id);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
