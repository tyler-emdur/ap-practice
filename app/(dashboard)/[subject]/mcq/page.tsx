"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getSubject } from "@/lib/subjects";

type Choice = "A" | "B" | "C" | "D";
type Question = {
  id: string;
  question: string;
  stimulus: string | null;
  choices: Record<Choice, string>;
  correct: Choice;
  explanation: string;
  skill: string;
  difficulty: string;
};

export default function MCQPage() {
  const params = useParams<{ subject: string }>();
  const subject = getSubject(params.subject);

  const [selectedUnit, setSelectedUnit] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!subject) return <div className="p-8 text-[#8a8070]">Subject not found</div>;

  const generate = async () => {
    if (!selectedUnit) return;
    setLoading(true);
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setDone(false);
    const res = await fetch("/api/mcq/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subject.name, unit: selectedUnit, count: 10 }),
    });
    const data = await res.json();
    setQuestions(data.questions ?? []);
    setLoading(false);
  };

  const answer = (choice: Choice) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    if (choice === questions[current].correct) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setAnswered(false);
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const q = questions[current];

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Session Complete
        </h2>
        <div className="text-6xl font-bold" style={{ fontFamily: "var(--font-mono)", color: pct >= 70 ? "#22c55e" : pct >= 50 ? "#eab308" : "#ef4444" }}>
          {pct}%
        </div>
        <p className="text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
          {score} of {questions.length} correct
        </p>
        <button
          onClick={() => { setQuestions([]); setDone(false); }}
          className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          New Session
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Multiple Choice
        </h1>
        <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
          {subject.name}
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="space-y-4">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full p-3 rounded-sm border border-[#1e2240] bg-[#13162a] text-[#f0ead6] text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <option value="">Select a unit...</option>
            {subject.units.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
          <button
            onClick={generate}
            disabled={!selectedUnit || loading}
            className="w-full py-3 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {loading ? "Generating questions..." : "Generate 10 Questions"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
            <span>{q.skill} · {q.difficulty}</span>
            <span>{current + 1} / {questions.length}</span>
          </div>

          {q.stimulus && (
            <blockquote
              className="p-4 border-l-2 border-[#c9a84c] bg-[#13162a] text-sm text-[#8a8070] italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {q.stimulus}
            </blockquote>
          )}

          <div className="p-6 rounded-sm border border-[#1e2240] bg-[#13162a]">
            <p className="text-[#f0ead6] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {q.question}
            </p>
          </div>

          <div className="space-y-2">
            {(["A", "B", "C", "D"] as Choice[]).map((letter) => {
              let borderColor = "#1e2240";
              let textColor = "#8a8070";
              if (answered) {
                if (letter === q.correct) { borderColor = "#22c55e"; textColor = "#22c55e"; }
                else if (letter === selected) { borderColor = "#ef4444"; textColor = "#ef4444"; }
              } else if (selected === letter) {
                borderColor = "#c9a84c"; textColor = "#c9a84c";
              }
              return (
                <button
                  key={letter}
                  onClick={() => answer(letter)}
                  disabled={answered}
                  className="w-full p-4 rounded-sm border text-left flex gap-3 transition-colors hover:border-[#c9a84c] disabled:cursor-default"
                  style={{ borderColor, background: "#13162a" }}
                >
                  <span className="shrink-0 text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: textColor }}>
                    {letter}
                  </span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: textColor || "#f0ead6" }}>
                    {q.choices[letter]}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="space-y-3">
              <div className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a]">
                <p className="text-xs text-[#c9a84c] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Explanation
                </p>
                <p className="text-sm text-[#f0ead6]" style={{ fontFamily: "var(--font-body)" }}>
                  {q.explanation}
                </p>
              </div>
              <button
                onClick={next}
                className="w-full py-3 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {current + 1 >= questions.length ? "See Results" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
