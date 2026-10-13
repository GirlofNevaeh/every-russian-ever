import { createContext, useCallback, useContext, useEffect, useState } from "react";
import gd from "@/i18n/packs/gd.json";
import cy from "@/i18n/packs/cy.json";
import ga from "@/i18n/packs/ga.json";
import fr from "@/i18n/packs/fr.json";
import it from "@/i18n/packs/it.json";
import es from "@/i18n/packs/es.json";
import de from "@/i18n/packs/de.json";
import ru from "@/i18n/packs/ru.json";
import { isLocale, type Locale } from "@/i18n/locales";

const packs: Record<Exclude<Locale, "en">, Record<string, string>> = {
  gd,
  cy,
  ga,
  fr,
  it,
  es,
  de,
  ru,
};

const storageKey = "ere-lang";

export type TxVars = Record<string, string | number>;

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  tx: (text: string) => string;
  txf: (template: string, vars: TxVars) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function applyVars(text: string, vars: TxVars) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(storageKey, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const title =
      locale === "en" ? "Every Russian Ever" : (packs[locale]["Every Russian Ever"] ?? "Every Russian Ever");
    document.title = title;
  }, [locale]);

  const tx = useCallback(
    (text: string) => {
      if (!text || locale === "en") return text;
      return packs[locale][text] ?? text;
    },
    [locale],
  );

  const txf = useCallback(
    (template: string, vars: TxVars) => applyVars(tx(template), vars),
    [tx],
  );

  return <I18nContext.Provider value={{ locale, setLocale, tx, txf }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside LocaleProvider");
  return value;
}
