import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ages, projects, type ProjectKind } from "@/data/projects";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/projects")({ component: ProjectsPage });

function ProjectsPage() {
  const { tx } = useI18n();
  const [age, setAge] = useState<(typeof ages)[number] | "all">("all");
  const [kind, setKind] = useState<ProjectKind | "all">("all");

  const shown = useMemo(
    () =>
      projects.filter(
        (project) => (age === "all" || project.age === age) && (kind === "all" || project.kind === kind),
      ),
    [age, kind],
  );

  function ageEmpty(value: (typeof ages)[number] | "all") {
    return !projects.some(
      (project) => (value === "all" || project.age === value) && (kind === "all" || project.kind === kind),
    );
  }

  function kindEmpty(value: ProjectKind | "all") {
    return !projects.some(
      (project) => (age === "all" || project.age === age) && (value === "all" || project.kind === value),
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">{tx("Projects")}</h1>
      <div className="mt-3 max-w-3xl space-y-3 text-lg">
        <p>
          {tx(
            "In Russia, children usually start Year 1 at about age 7. These projects are for Age 5-12.",
          )}
        </p>
        <p>{tx("Use facts from this site.")}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Filter on={age === "all"} disabled={ageEmpty("all")} label="All ages" click={() => setAge("all")} />
        {ages.map((item) => (
          <Filter key={item} on={age === item} disabled={ageEmpty(item)} label={item} click={() => setAge(item)} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Filter on={kind === "all"} disabled={kindEmpty("all")} label="Individual and team" click={() => setKind("all")} />
        <Filter on={kind === "individual"} disabled={kindEmpty("individual")} label="Individual" click={() => setKind("individual")} />
        <Filter on={kind === "team"} disabled={kindEmpty("team")} label="Team" click={() => setKind("team")} />
      </div>
      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {shown.map((project) => (
          <li key={project.id} className="rounded-card border border-neva/20 bg-card p-4">
            <p className="font-semibold text-neva">
              {tx(project.age)} · {tx(project.kind === "individual" ? "Individual" : "Team")}
            </p>
            <h2 className="mt-1 font-serif text-2xl text-neva">{tx(project.title)}</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              {project.steps.map((step) => (
                <li key={step}>{tx(step)}</li>
              ))}
            </ol>
            <p className="mt-3">
              <span className="font-semibold text-neva">{tx("What you need.")} </span>
              {tx(project.need)}
            </p>
            <p>
              <span className="font-semibold text-neva">{tx("You are done when.")} </span>
              {tx(project.done)}
            </p>
            <p className="mt-3">{tx("A class may answer in Russian.")}</p>
            <p>{tx("Where a republic has another official language, a class may also answer in that language.")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

function Filter({
  on,
  disabled,
  label,
  click,
}: {
  on: boolean;
  disabled: boolean;
  label: string;
  click: () => void;
}) {
  const { tx } = useI18n();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={click}
      className={
        "min-h-11 rounded-md border-2 px-3 font-semibold " +
        (on ? "border-neva bg-neva text-paper" : "border-neva bg-card text-neva disabled:opacity-40")
      }
    >
      {tx(label)}
    </button>
  );
}
