"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getSubject } from "@/lib/subjects";
import { AP_WORLD_FLASHCARDS, type Flashcard } from "@/lib/banks/ap-world/flashcards";
import { shuffleArray } from "@/lib/utils";

function getBank(subjectId: string): Flashcard[] {
  if (subjectId === "ap-world") return AP_WORLD_FLASHCARDS;
  return [];
}

export default function FlashcardsPage() {
  const params = useParams<{ subject: string }>();
  const subject = getSubject(params.subject);

  const bank = getBank(params.subject);

  // Multi-select unit filter — "all" or array of unit ids
  const [selectedUnits, setSelectedUnits] = useState<string[]>(["all"]);
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const filteredCards = useMemo(() => {
    if (selectedUnits.includes("all")) return bank;
    return bank.filter((c) => selectedUnits.includes(c.unit));
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
    setCards(shuffleArray(filteredCards));
    setCurrent(0);
    setFlipped(false);
    setDone(false);
    setStarted(true);
  };

  const next = () => {
    setFlipped(false);
    if (current + 1 >= cards.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (done) {
    return (
      <div className="p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-4xl text-[#c9a84c]">✓</div>
        <h2 className="text-2xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Deck complete!
        </h2>
        <p className="text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
          You reviewed {cards.length} cards.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { setCards(shuffleArray(filteredCards)); setCurrent(0); setFlipped(false); setDone(false); }}
            className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Study Again
          </button>
          <button
            onClick={() => { setStarted(false); setDone(false); }}
            className="px-6 py-2 rounded-sm border border-[#1e2240] text-[#8a8070] hover:border-[#c9a84c] hover:text-[#f0ead6] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Change Units
          </button>
        </div>
      </div>
    );
  }

  if (started && cards.length > 0) {
    const card = cards[current];
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
              Flashcards
            </h1>
            <p className="text-xs text-[#8a8070] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {card.unitName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
              {current + 1} / {cards.length}
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
            style={{ width: `${((current + 1) / cards.length) * 100}%` }}
          />
        </div>

        {/* Card */}
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full min-h-[260px] p-8 rounded-sm border border-[#1e2240] bg-[#13162a] text-left hover:border-[#c9a84c] transition-colors flex flex-col justify-between"
        >
          <p className="text-xs text-[#c9a84c] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
            {flipped ? "ANSWER — tap to flip back" : "QUESTION — tap to reveal"}
          </p>
          <p
            className="text-lg text-[#f0ead6] leading-relaxed flex-1 flex items-center"
            style={{ fontFamily: flipped ? "var(--font-body)" : "var(--font-heading)" }}
          >
            {flipped ? card.back : card.front}
          </p>
          {flipped && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-sm border border-[#1e2240] text-[#8a8070]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </button>

        {flipped && (
          <div className="flex gap-3">
            <button
              onClick={next}
              className="flex-1 py-2.5 rounded-sm border border-[#ef4444] text-[#ef4444] text-sm hover:bg-[#ef4444] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Still learning
            </button>
            <button
              onClick={next}
              className="flex-1 py-2.5 rounded-sm border border-[#22c55e] text-[#22c55e] text-sm hover:bg-[#22c55e] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Got it
            </button>
          </div>
        )}
      </div>
    );
  }

  // Unit selection screen
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Flashcards
        </h1>
        <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
          {subject.name}
        </p>
      </div>

      {bank.length === 0 ? (
        <p className="text-[#8a8070] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          No flashcard bank available for this subject yet.
        </p>
      ) : (
        <>
          <div>
            <p className="text-xs text-[#8a8070] mb-3 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Select Units
            </p>
            <div className="flex flex-wrap gap-2">
              {/* All Units button */}
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
                const count = bank.filter((c) => c.unit === u.id).length;
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

          <div className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a] flex items-center justify-between">
            <div>
              <p className="text-sm text-[#f0ead6]" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredCards.length} cards ready
              </p>
              <p className="text-xs text-[#8a8070] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                {selectedUnits.includes("all")
                  ? "All 9 units"
                  : `${selectedUnits.length} unit${selectedUnits.length !== 1 ? "s" : ""} selected`}
              </p>
            </div>
            <button
              onClick={start}
              disabled={filteredCards.length === 0}
              className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Start Studying
            </button>
          </div>
        </>
      )}
    </div>
  );
}
