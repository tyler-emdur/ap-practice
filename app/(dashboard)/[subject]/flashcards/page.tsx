"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getSubject } from "@/lib/subjects";

export default function FlashcardsPage() {
  const params = useParams<{ subject: string }>();
  const subject = getSubject(params.subject);

  const [selectedUnit, setSelectedUnit] = useState("");
  const [cards, setCards] = useState<Array<{ id: string; front: string; back: string }>>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!subject) return <div className="p-8 text-[#8a8070]">Subject not found</div>;

  const generate = async () => {
    if (!selectedUnit) return;
    setLoading(true);
    setCards([]);
    setCurrent(0);
    setFlipped(false);
    setDone(false);
    const res = await fetch("/api/flashcards/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subject.name, unit: selectedUnit, count: 15 }),
    });
    const data = await res.json();
    setCards(data.cards ?? []);
    setLoading(false);
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
        <div className="text-4xl">✓</div>
        <h2 className="text-2xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Deck complete!
        </h2>
        <p className="text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
          You reviewed {cards.length} cards.
        </p>
        <button
          onClick={() => { setCurrent(0); setFlipped(false); setDone(false); }}
          className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Study Again
        </button>
      </div>
    );
  }

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

      {cards.length === 0 ? (
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
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
            <span>{selectedUnit}</span>
            <span>{current + 1} / {cards.length}</span>
          </div>

          {/* Card */}
          <button
            onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[240px] p-8 rounded-sm border border-[#1e2240] bg-[#13162a] text-left hover:border-[#c9a84c] transition-colors flex flex-col justify-center"
          >
            <p className="text-xs text-[#c9a84c] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              {flipped ? "Answer" : "Question — tap to reveal"}
            </p>
            <p
              className="text-xl text-[#f0ead6] leading-relaxed"
              style={{ fontFamily: flipped ? "var(--font-body)" : "var(--font-heading)" }}
            >
              {flipped ? cards[current].back : cards[current].front}
            </p>
          </button>

          {flipped && (
            <div className="flex gap-3">
              <button
                onClick={next}
                className="flex-1 py-2 rounded-sm border border-[#ef4444] text-[#ef4444] text-sm hover:bg-[#ef4444] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Still learning
              </button>
              <button
                onClick={next}
                className="flex-1 py-2 rounded-sm border border-[#22c55e] text-[#22c55e] text-sm hover:bg-[#22c55e] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Got it
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
