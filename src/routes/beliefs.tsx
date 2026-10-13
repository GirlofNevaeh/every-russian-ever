import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/beliefs")({ component: Beliefs });

function Beliefs() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-lg">
      <h1 className="font-serif text-4xl text-neva">Beliefs</h1>
      <p>The Firebird and Baba Yaga are stories, not the news.</p>
      <p>People tell them to wonder, and to feel a little shiver, and then they come home.</p>
      <h2 className="pt-2 font-serif text-2xl text-neva">Churches and holy days</h2>
      <p>Churches and icons are part of Christian life here.</p>
      <p>At Easter, many families colour eggs and bake a tall sweet bread.</p>
      <p>Many families mark Christmas in January.</p>
      <p>
        <Link to="/people/$slug" params={{ slug: "rublev" }} className="underline">
          Andrei Rublev
        </Link>{" "}
        painted icons. The{" "}
        <Link to="/places/$slug" params={{ slug: "lavra" }} className="underline">
          Trinity Lavra
        </Link>{" "}
        is still a place of prayer.
      </p>
      <h2 className="pt-2 font-serif text-2xl text-neva">Many faiths</h2>
      <p>Muslim people have lived in these lands for many centuries, including in Tatarstan and the Caucasus.</p>
      <p>Muslim families may mark Ramadan and Eid.</p>
      <p>Buddhist people have lived in Buryatia and Kalmykia for many centuries.</p>
      <p>Buddhist families there have temples and festivals.</p>
      <p>Jewish people have lived in these towns for many centuries.</p>
      <p>Jewish families may mark Shabbat and Passover.</p>
      <p>We are not sure what people at very old graves believed.</p>
      <p>Many families in Russia today are Christian, Muslim, Buddhist, Jewish, or of no religion.</p>
    </main>
  );
}
