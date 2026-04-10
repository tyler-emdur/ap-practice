"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getSubject } from "@/lib/subjects";
import { AP_WORLD_MCQ, type MCQQuestion } from "@/lib/banks/ap-world/mcq";
import { SAT_MCQ } from "@/lib/banks/sat/mcq";
import { shuffleArray } from "@/lib/utils";

type Choice = "A" | "B" | "C" | "D";

const QUESTION_COUNTS = [10, 25, 50] as const;

function getBank(subjectId: string): MCQQuestion[] {
  if (subjectId === "ap-world") return AP_WORLD_MCQ;
  if (subjectId === "sat") return SAT_MCQ as unknown as MCQQuestion[];
  return [];
}

export default function MCQPage() {
  const params = useParams<{ subject: string }>();
  const subject = getSubject(params.subject);
  const bank = getBank(params.subject);

  // Setup state
  const [selectedUnits, setSelectedUnits] = useState<string[]>(["all"]);
  const [questionCount, setQuestionCount] = useState<10 | 25 | 50>(10);

  // Session state
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const filteredBank = useMemo(() => {
    if (selectedUnits.includes("all")) return bank;
    return bank.filter((q) => selectedUnits.includes(q.unit));
  }, [bank, selectedUnits]);

  if (!subject) return <div className="p-8 text-[#8a8070]">Subject not found</div>;

  const toggleUnit = (unitId: string) => {
    if (unitId === "all") {
      setSelectedUnits(["all"]);
      return;
    }
    setSelectedUnits((prev) => {
      const withoutAll = prev.filter((u) => u !== "all");
      if (withoutAll.includes(unitId)) {
        const next = withoutAll.filter((u) => u !== unitId);
        return next.length === 0 ? ["all"] : next;
      }
      return [...withoutAll, unitId];
    });
  };

  const start = () => {
    const count = Math.min(questionCount, filteredBank.length);
    setQuestions(shuffleArray(filteredBank).slice(0, count));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setDone(false);
    setStarted(true);
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

  // Results screen
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const color = pct >= 70 ? "#22c55e" : pct >= 50 ? "#eab308" : "#ef4444";
    return (
      <div className="p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Session Complete
        </h2>
        <div className="text-7xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>
          {pct}%
        </div>
        <p className="text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
          {score} of {questions.length} correct
        </p>
        <div className="flex gap-3">
          <button
            onClick={start}
            className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            New Session
          </button>
          <button
            onClick={() => { setStarted(false); setDone(false); }}
            className="px-6 py-2 rounded-sm border border-[#1e2240] text-[#8a8070] hover:border-[#c9a84c] hover:text-[#f0ead6] transition-colors text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Change Units
          </button>
        </div>
      </div>
    );
  }

  // Active session
  if (started && questions.length > 0) {
    const q = questions[current];
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
              Multiple Choice
            </h1>
            <p className="text-xs text-[#8a8070] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {q.unitName} · {q.skill} · {q.difficulty}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
              {current + 1} / {questions.length}
            </span>
            <span className="text-xs text-[#22c55e]" style={{ fontFamily: "var(--font-mono)" }}>
              {score} correct
            </span>
            <button
              onClick={() => setStarted(false)}
              className="text-xs text-[#8a8070] hover:text-[#f0ead6] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ← Units
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-[#1e2240] rounded-full">
          <div
            className="h-full bg-[#c9a84c] rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Stimulus */}
        {q.stimulus && (
          <div className="border-l-2 border-[#c9a84c] bg-[#13162a] p-4 space-y-1">
            <p
              className="text-sm text-[#d4c9a8] leading-relaxed italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {q.stimulus}
            </p>
            {q.stimulusAttribution && (
              <p className="text-xs text-[#8a8070] not-italic" style={{ fontFamily: "var(--font-mono)" }}>
                — {q.stimulusAttribution}
              </p>
            )}
            {q.stimulusType && (
              <span className="inline-block text-[10px] px-2 py-0.5 border border-[#1e2240] text-[#8a8070] rounded-sm" style={{ fontFamily: "var(--font-mono)" }}>
                {q.stimulusType.replace("_", " ")}
              </span>
            )}
          </div>
        )}

        {/* Question */}
        <div className="p-5 rounded-sm border border-[#1e2240] bg-[#13162a]">
          <p className="text-[#f0ead6] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {q.question}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-2">
          {(["A", "B", "C", "D"] as Choice[]).map((letter) => {
            let borderColor = "#1e2240";
            let textColor = "#8a8070";
            let bg = "#13162a";
            if (answered) {
              if (letter === q.correct) { borderColor = "#22c55e"; textColor = "#22c55e"; bg = "rgba(34,197,94,0.05)"; }
              else if (letter === selected) { borderColor = "#ef4444"; textColor = "#ef4444"; bg = "rgba(239,68,68,0.05)"; }
            }
            return (
              <button
                key={letter}
                onClick={() => answer(letter)}
                disabled={answered}
                className="w-full p-4 rounded-sm border text-left flex gap-3 transition-all hover:border-[#c9a84c] disabled:cursor-default"
                style={{ borderColor, background: bg }}
              >
                <span
                  className="shrink-0 w-5 h-5 flex items-center justify-center rounded-sm text-xs font-bold border"
                  style={{ fontFamily: "var(--font-mono)", color: textColor, borderColor }}
                >
                  {letter}
                </span>
                <span className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: answered ? textColor : "#d4c9a8" }}>
                  {q.choices[letter]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="space-y-3">
            <div className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a]">
              <p className="text-xs text-[#c9a84c] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                {selected === q.correct ? "✓ Correct" : `✗ Correct answer: ${q.correct}`}
              </p>
              <p className="text-sm text-[#d4c9a8] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {q.explanation}
              </p>
            </div>
            <button
              onClick={next}
              className="w-full py-3 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {current + 1 >= questions.length ? "See Results" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Setup screen
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Multiple Choice
        </h1>
        <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
          {subject.name}
        </p>
      </div>

      {bank.length === 0 ? (
        <p className="text-[#8a8070] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          No question bank available for this subject yet.
        </p>
      ) : (
        <>
          {/* Unit selector */}
          <div>
            <p className="text-xs text-[#8a8070] mb-3 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Select Units
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleUnit("all")}
                className="px-3 py-1.5 rounded-sm border text-xs transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  borderColor: selectedUnits.includes("all") ? "#c9a84c" : "#1e2240",
                  color: selectedUnits.includes("all") ? "#c9a84c" : "#8a8070",
                  background: selectedUnits.includes("all") ? "rgba(201,168,76,0.08)" : "transparent",
                }}
              >
                All Units
              </button>
              {subject.units.map((u) => {
                const active = selectedUnits.includes(u.id);
                const count = bank.filter((q) => q.unit === u.id).length;
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleUnit(u.id)}
                    className="px-3 py-1.5 rounded-sm border text-xs transition-colors"
                    style={{
                      fontFamily: "var(--font-mono)",
                      borderColor: active ? "#c9a84c" : "#1e2240",
                      color: active ? "#c9a84c" : "#8a8070",
                      background: active ? "rgba(201,168,76,0.08)" : "transparent",
                    }}
                  >
                    {u.id.replace("unit-", "U")} · {count}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question count */}
          <div>
            <p className="text-xs text-[#8a8070] mb-3 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Questions
            </p>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((n) => {
                const available = Math.min(n, filteredBank.length);
                const isActive = questionCount === n;
                const disabled = filteredBank.length < (n === 10 ? 1 : n === 25 ? 11 : 26);
                return (
                  <button
                    key={n}
                    onClick={() => !disabled && setQuestionCount(n)}
                    disabled={disabled}
                    className="flex-1 py-2 rounded-sm border text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-mono)",
                      borderColor: isActive ? "#c9a84c" : "#1e2240",
                      color: isActive ? "#c9a84c" : "#8a8070",
                      background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                    }}
                  >
                    {n}
                    {available < n && !disabled && (
                      <span className="text-[10px] ml-1 opacity-60">({available})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary + start */}
          <div className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a] flex items-center justify-between">
            <div>
              <p className="text-sm text-[#f0ead6]" style={{ fontFamily: "var(--font-mono)" }}>
                {Math.min(questionCount, filteredBank.length)} questions from {filteredBank.length} available
              </p>
              <p className="text-xs text-[#8a8070] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                {selectedUnits.includes("all")
                  ? `All ${subject.units.length} units · randomized`
                  : `${selectedUnits.length} unit${selectedUnits.length !== 1 ? "s" : ""} selected · randomized`}
              </p>
            </div>
            <button
              onClick={start}
              disabled={filteredBank.length === 0}
              className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Start Practice
            </button>
          </div>
        </>
      )}
    </div>
  );
}
