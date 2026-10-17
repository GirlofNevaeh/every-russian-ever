import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QUIZ_LENGTH, questions, type QuizQuestion } from "@/data/quiz";
import { playCheer, playFart } from "@/lib/quiz-sounds";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

type Team = { name: string; score: number };

const TEAM_NAMES = ["Team One", "Team Two", "Team Three", "Team Four", "Team Five", "Team Six"];

function shuffleIndexes(count: number, seed: number) {
  const list = Array.from({ length: questions.length }, (_, index) => index);
  let h = seed || 1;
  for (let i = list.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    const j = h % (i + 1);
    const swap = list[i];
    list[i] = list[j];
    list[j] = swap;
  }
  return list.slice(0, count);
}

function QuizPage() {
  const { tx, txf } = useI18n();
  const [mode, setMode] = useState<"solo" | "class" | null>(null);
  const [roundSize, setRoundSize] = useState<10 | "all">(10);
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team One", score: 0 },
    { name: "Team Two", score: 0 },
  ]);
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [soloPick, setSoloPick] = useState<number | null>(null);
  const [teamPicks, setTeamPicks] = useState<(number | null)[]>([]);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [suddenTeams, setSuddenTeams] = useState<number[]>([]);
  const [suddenQuestion, setSuddenQuestion] = useState<QuizQuestion | null>(null);
  const [suddenPicks, setSuddenPicks] = useState<(number | null)[]>([]);
  const [suddenShow, setSuddenShow] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => {
      setShow(false);
      setSoloPick(null);
      setTeamPicks(teams.map(() => null));
      if (index + 1 >= order.length) {
        finishRound();
      } else {
        setIndex((value) => value + 1);
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [show, index, order.length, teams]);

  function finishRound() {
    if (mode !== "class") {
      setDone(true);
      return;
    }
    const top = Math.max(...teams.map((team) => team.score));
    const tied = teams
      .map((team, teamIndex) => ({ team, teamIndex }))
      .filter((item) => item.team.score === top);
    if (tied.length > 1) {
      const used = new Set(order);
      const spareTie = questions.findIndex(
        (question, questionIndex) => question.tieBreak && !used.has(questionIndex),
      );
      const spareAny = questions.findIndex((_, questionIndex) => !used.has(questionIndex));
      const spareRepeat = questions.findIndex((question) => question.tieBreak);
      const pick = spareTie >= 0 ? spareTie : spareAny >= 0 ? spareAny : spareRepeat >= 0 ? spareRepeat : 0;
      setSuddenTeams(tied.map((item) => item.teamIndex));
      setSuddenQuestion(questions[pick]);
      setSuddenPicks(tied.map(() => null));
      setSuddenShow(false);
      setDone(false);
    } else {
      setWinner(tied[0]?.team.name ?? null);
      setDone(true);
    }
  }

  const question = order.length ? questions[order[index]] : undefined;
  const allTeamsReady = teamPicks.length > 0 && teamPicks.every((pick) => pick !== null);

  const suddenReady = suddenPicks.length > 0 && suddenPicks.every((pick) => pick !== null);

  function teamLabel(name: string) {
    return /^(Team (One|Two|Three|Four|Five|Six))$/.test(name) ? tx(name) : name;
  }

  const scoreLine =
    mode === "solo"
      ? txf("{n} correct", { n: score })
      : teams.map((team) => `${teamLabel(team.name)}: ${team.score}`).join(" · ");

  function begin() {
    const count = roundSize === "all" ? questions.length : 10;
    setOrder(shuffleIndexes(count, Date.now() % 100000));
    setIndex(0);
    setScore(0);
    setTeams((current) => current.map((team) => ({ ...team, score: 0 })));
    setTeamPicks(teams.map(() => null));
    setSoloPick(null);
    setShow(false);
    setDone(false);
    setWinner(null);
    setSuddenQuestion(null);
    setStarted(true);
  }

  function answerSolo(choice: number) {
    if (show || soloPick !== null || !question) return;
    setSoloPick(choice);
    const correct = choice === question.answer;
    if (correct) setScore((value) => value + 1);
    if (correct) playCheer();
    else playFart();
    setShow(true);
  }

  function answerTeam(teamIndex: number, choice: number) {
    if (show) return;
    setTeamPicks((current) => {
      const next = [...current];
      next[teamIndex] = choice;
      return next;
    });
  }

  function revealTeams() {
    if (!question || show || !allTeamsReady) return;
    const anyRight = teamPicks.some((pick) => pick === question.answer);
    const anyWrong = teamPicks.some((pick) => pick !== null && pick !== question.answer);
    if (anyRight) playCheer();
    if (anyWrong) playFart();
    setTeams((current) =>
      current.map((team, teamIndex) =>
        teamPicks[teamIndex] === question.answer ? { ...team, score: team.score + 1 } : team,
      ),
    );
    setShow(true);
  }

  function revealSudden() {
    if (!suddenQuestion || !suddenReady || suddenShow) return;
    const correctIndexes = suddenTeams.filter(
      (_, offset) => suddenPicks[offset] === suddenQuestion.answer,
    );
    if (correctIndexes.length > 0) playCheer();
    if (correctIndexes.length < suddenTeams.length) playFart();
    setTeams((current) =>
      current.map((team, teamIndex) =>
        correctIndexes.includes(teamIndex) ? { ...team, score: team.score + 1 } : team,
      ),
    );
    setSuddenShow(true);
    window.setTimeout(() => {
      setTeams((current) => {
        const top = Math.max(...current.map((team) => team.score));
        const leaders = current.filter((team) => team.score === top);
        if (leaders.length === 1) {
          setWinner(leaders[0].name);
          setDone(true);
          setSuddenQuestion(null);
        } else {
          const next = questions.find((item) => item !== suddenQuestion && item.tieBreak) ?? questions[1];
          setSuddenQuestion(next);
          setSuddenPicks(leaders.map(() => null));
          setSuddenTeams(
            current
              .map((team, teamIndex) => (team.score === top ? teamIndex : -1))
              .filter((teamIndex) => teamIndex >= 0),
          );
          setSuddenShow(false);
        }
        return current;
      });
    }, 1000);
  }

  if (!mode) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-4xl text-neva">{tx("Quiz")}</h1>
        <p className="mt-3 text-lg">
          {txf("This quiz has {n} questions. A round can be 10, or the whole set.", { n: QUIZ_LENGTH })}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="min-h-11 rounded-md bg-banner px-4 font-semibold text-paper" onClick={() => setMode("solo")}>
            {tx("Solo play")}
          </button>
          <button type="button" className="min-h-11 rounded-md bg-banner px-4 font-semibold text-paper" onClick={() => setMode("class")}>
            {tx("Class mode")}
          </button>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-4xl text-neva">{mode === "solo" ? tx("Solo play") : tx("Class mode")}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={"min-h-11 rounded-md border-2 border-neva px-4 font-semibold " + (roundSize === 10 ? "bg-neva text-paper" : "bg-card text-neva")}
            onClick={() => setRoundSize(10)}
          >
            {tx("10 questions")}
          </button>
          <button
            type="button"
            className={"min-h-11 rounded-md border-2 border-neva px-4 font-semibold " + (roundSize === "all" ? "bg-neva text-paper" : "bg-card text-neva")}
            onClick={() => setRoundSize("all")}
          >
            {txf("All {n}", { n: QUIZ_LENGTH })}
          </button>
        </div>
        {mode === "class" ? (
          <div className="mt-6 space-y-3">
            {teams.map((team, teamIndex) => (
              <label key={teamIndex} className="block">
                <span className="text-neva">{tx(TEAM_NAMES[teamIndex] ?? team.name)}</span>
                <input
                  value={teamLabel(team.name)}
                  onChange={(event) =>
                    setTeams((current) =>
                      current.map((item, index) =>
                        index === teamIndex ? { ...item, name: event.target.value } : item,
                      ),
                    )
                  }
                  className="mt-1 min-h-11 w-full rounded-md border-2 border-neva bg-card px-3"
                />
              </label>
            ))}
            <div className="flex gap-2">
              {teams.length < 6 ? (
                <button
                  type="button"
                  className="min-h-11 rounded-md border-2 border-neva px-3 font-semibold text-neva"
                  onClick={() =>
                    setTeams((current) => [
                      ...current,
                      { name: TEAM_NAMES[current.length] ?? "Team Six", score: 0 },
                    ])
                  }
                >
                  {tx("Add a team")}
                </button>
              ) : null}
              {teams.length > 2 ? (
                <button
                  type="button"
                  className="min-h-11 rounded-md border-2 border-neva px-3 font-semibold text-neva"
                  onClick={() => setTeams((current) => current.slice(0, -1))}
                >
                  {tx("Remove a team")}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        <button type="button" className="mt-6 min-h-11 rounded-md bg-banner px-4 font-semibold text-paper" onClick={begin}>
          {tx("Start")}
        </button>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-4xl text-neva">{tx("Round finished")}</h1>
        <p className="mt-3 text-lg">{scoreLine}</p>
        {winner ? <p className="mt-2 text-lg">{txf("{name} is ahead.", { name: teamLabel(winner) })}</p> : null}
        <button
          type="button"
          className="mt-6 min-h-11 rounded-md bg-banner px-4 font-semibold text-paper"
          onClick={() => {
            setStarted(false);
            setDone(false);
            setMode(null);
          }}
        >
          {tx("Play again")}
        </button>
      </main>
    );
  }

  if (suddenQuestion) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-4xl text-neva">{tx("Sudden death")}</h1>
        <p className="mt-3 text-lg">
          {tx("These teams are level. Every tied team answers before anyone is told the answer.")}
        </p>
        <p className="mt-4 text-xl text-ink">{tx(suddenQuestion.prompt)}</p>
        <div className="mt-4 space-y-4">
          {suddenTeams.map((teamIndex, offset) => (
            <div key={teamIndex}>
              <p className="font-semibold text-neva">{teamLabel(teams[teamIndex]?.name ?? "")}</p>
              <div className="mt-2 grid gap-2">
                {suddenQuestion.choices.map((choice, choiceIndex) => {
                  const picked = suddenPicks[offset] === choiceIndex;
                  const mark = suddenShow && choiceIndex === suddenQuestion.answer;
                  return (
                    <button
                      key={choice}
                      type="button"
                      disabled={suddenShow}
                      onClick={() =>
                        setSuddenPicks((current) => {
                          const next = [...current];
                          next[offset] = choiceIndex;
                          return next;
                        })
                      }
                      className={
                        "min-h-11 rounded-md border-2 px-3 text-left " +
                        (mark || picked ? "border-neva bg-neva text-paper" : "border-neva bg-card text-ink")
                      }
                    >
                      {tx(choice)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!suddenShow ? (
          <button
            type="button"
            disabled={!suddenReady}
            onClick={revealSudden}
            className="mt-4 min-h-11 rounded-md bg-banner px-4 font-semibold text-paper disabled:opacity-40"
          >
            {tx("Show the answer")}
          </button>
        ) : (
          <p className="mt-4 text-lg">
            {txf("The answer is {answer}.", { answer: tx(suddenQuestion.choices[suddenQuestion.answer]) })}
          </p>
        )}
      </main>
    );
  }

  if (!question) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-neva">
        {txf("Question {n} of {m}", { n: index + 1, m: order.length })}
      </p>
      <h1 className="mt-2 font-serif text-3xl text-neva">{tx(question.prompt)}</h1>
      {mode === "solo" ? (
        <div className="mt-4 grid gap-2">
          {question.choices.map((choice, choiceIndex) => {
            const picked = soloPick === choiceIndex;
            const mark = show && choiceIndex === question.answer;
            return (
              <button
                key={choice}
                type="button"
                disabled={show}
                onClick={() => answerSolo(choiceIndex)}
                className={
                  "min-h-11 rounded-md border-2 px-3 text-left text-lg " +
                  (mark || picked ? "border-neva bg-neva text-paper" : "border-neva bg-card text-ink")
                }
              >
                {tx(choice)}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {teams.map((team, teamIndex) => (
            <div key={team.name}>
              <p className="font-semibold text-neva">{teamLabel(team.name)}</p>
              <div className="mt-2 grid gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const picked = teamPicks[teamIndex] === choiceIndex;
                  const mark = show && choiceIndex === question.answer;
                  return (
                    <button
                      key={choice}
                      type="button"
                      disabled={show}
                      onClick={() => answerTeam(teamIndex, choiceIndex)}
                      className={
                        "min-h-11 rounded-md border-2 px-3 text-left " +
                        (mark || picked ? "border-neva bg-neva text-paper" : "border-neva bg-card text-ink")
                      }
                    >
                      {tx(choice)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!show ? (
            <button
              type="button"
              disabled={!allTeamsReady}
              onClick={revealTeams}
              className="min-h-11 rounded-md bg-banner px-4 font-semibold text-paper disabled:opacity-40"
            >
              {tx("Show the answer")}
            </button>
          ) : null}
        </div>
      )}
      {show ? (
        <p className="mt-4 text-lg text-ink">
          {mode === "solo" && soloPick === question.answer
            ? `${tx("Yes.")} ${tx(question.choices[question.answer])}.`
            : txf("The answer is {answer}.", { answer: tx(question.choices[question.answer]) })}
        </p>
      ) : null}
      <p className="mt-4 text-base text-ink">{scoreLine}</p>
    </main>
  );
}
