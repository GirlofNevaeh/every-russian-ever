import { Link, createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/beliefs")({ component: Beliefs });

function Beliefs() {
  const { tx } = useI18n();
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-lg">
      <h1 className="font-serif text-4xl text-neva">{tx("Beliefs")}</h1>
      <p>{tx("The Firebird and Baba Yaga are stories, not the news.")}</p>
      <p>{tx("People tell them to wonder, and to feel a little shiver, and then they come home.")}</p>
      <h2 className="pt-2 font-serif text-2xl text-neva">{tx("Churches and holy days")}</h2>
      <p>{tx("Churches and icons are part of Christian life here.")}</p>
      <p>{tx("At Easter, many families colour eggs and bake a tall sweet bread.")}</p>
      <p>{tx("Many families mark Christmas in January.")}</p>
      <p>
        <Link to="/people/$slug" params={{ slug: "rublev" }} className="underline">
          {tx("Andrei Rublev")}
        </Link>{" "}
        {tx("painted icons.")}{" "}
        <Link to="/places/$slug" params={{ slug: "lavra" }} className="underline">
          {tx("Trinity Lavra")}
        </Link>{" "}
        {tx("is still a place of prayer.")}
      </p>
      <h2 className="pt-2 font-serif text-2xl text-neva">{tx("Many faiths")}</h2>
      <p>{tx("Muslim people have lived in these lands for many centuries, including in Tatarstan and the Caucasus.")}</p>
      <p>{tx("Muslim families may mark Ramadan and Eid.")}</p>
      <p>{tx("Buddhist people have lived in Buryatia and Kalmykia for many centuries.")}</p>
      <p>{tx("Buddhist families there have temples and festivals.")}</p>
      <p>{tx("Jewish people have lived in these towns for many centuries.")}</p>
      <p>{tx("Jewish families may mark Shabbat and Passover.")}</p>
      <p>{tx("We are not sure what people at very old graves believed.")}</p>
      <p>{tx("Many families in Russia today are Christian, Muslim, Buddhist, Jewish, or of no religion.")}</p>
    </main>
  );
}
