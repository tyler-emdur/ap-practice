"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getSubject } from "@/lib/subjects";

type FRQData = {
  id: string;
  type: string;
  subject: string;
  prompt: string;
  parts: string[] | null;
  documents: Array<{ label: string; excerpt: string; attribution: string }>;
  totalPoints: number;
  rubric: Record<string, { points: number; criteria: string }>;
  scoringNotes: string;
};

type GradingResult = {
  totalPoints: number;
  earnedPoints: number;
  score: number;
  breakdown: Record<string, { earned: number; possible: number; feedback: string }>;
  overallFeedback: string;
  strongElements: string[];
  improvementAreas: string[];
  modelResponseHints: string;
};

export default function FRQPage() {
  const params = useParams<{ subject: string }>();
  const subject = getSubject(params.subject);

  const [selectedType, setSelectedType] = useState("");
  const [frq, setFrq] = useState<FRQData | null>(null);
  const [response, setResponse] = useState("");
  const [result, setResult] = useState<GradingResult | null>(null);
  const [loadingFRQ, setLoadingFRQ] = useState(false);
  const [loadingGrade, setLoadingGrade] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  if (!subject) return <div className="p-8 text-[#8a8070]">Subject not found</div>;

  const generateFRQ = async () => {
    if (!selectedType) return;
    setLoadingFRQ(true);
    setFrq(null);
    setResponse("");
    setResult(null);
    setWordCount(0);
    const res = await fetch("/api/frq/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subject.name, frqType: selectedType }),
    });
    const data = await res.json();
    setFrq(data.frq ?? null);
    setLoadingFRQ(false);
  };

  const grade = async () => {
    if (!frq || !response.trim()) return;
    setLoadingGrade(true);
    const res = await fetch("/api/frq/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subject.name,
        frqType: frq.type,
        rubric: frq.rubric,
        prompt: frq.prompt,
        response,
        maxPoints: frq.totalPoints,
      }),
    });
    const data = await res.json();
    setResult(data);
    setLoadingGrade(false);
  };

  const handleResponseChange = (val: string) => {
    setResponse(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
  };

  if (result && frq) {
    const pct = Math.round(result.score * 100);
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
            Grading Results
          </h1>
          <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
            {frq.type} · {subject.name}
          </p>
        </div>

        <div className="flex items-center gap-6 p-6 rounded-sm border border-[#1e2240] bg-[#13162a]">
          <div
            className="text-5xl font-bold"
            style={{
              fontFamily: "var(--font-mono)",
              color: pct >= 70 ? "#22c55e" : pct >= 50 ? "#eab308" : "#ef4444",
            }}
          >
            {result.earnedPoints}/{result.totalPoints}
          </div>
          <div>
            <p className="text-lg font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
              {pct}%
            </p>
            <p className="text-sm text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
              {result.overallFeedback}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(result.breakdown).map(([cat, b]) => (
            <div key={cat} className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#c9a84c]" style={{ fontFamily: "var(--font-mono)" }}>
                  {cat}
                </span>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: b.earned === b.possible ? "#22c55e" : b.earned === 0 ? "#ef4444" : "#eab308",
                  }}
                >
                  {b.earned}/{b.possible}
                </span>
              </div>
              <p className="text-sm text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
                {b.feedback}
              </p>
            </div>
          ))}
        </div>

        {result.improvementAreas.length > 0 && (
          <div className="p-4 rounded-sm border border-[#ef444430] bg-[#13162a]">
            <p className="text-xs text-[#ef4444] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Areas to Improve
            </p>
            <ul className="space-y-1">
              {result.improvementAreas.map((item, i) => (
                <li key={i} className="text-sm text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.modelResponseHints && (
          <div className="p-4 rounded-sm border border-[#c9a84c30] bg-[#13162a]">
            <p className="text-xs text-[#c9a84c] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Model Response Hints
            </p>
            <p className="text-sm text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
              {result.modelResponseHints}
            </p>
          </div>
        )}

        <button
          onClick={() => { setFrq(null); setResult(null); setResponse(""); }}
          className="px-6 py-2 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          New FRQ
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Free Response
        </h1>
        <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
          {subject.name}
        </p>
      </div>

      {!frq ? (
        <div className="space-y-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-3 rounded-sm border border-[#1e2240] bg-[#13162a] text-[#f0ead6] text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <option value="">Select FRQ type...</option>
            {subject.frqTypes.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <button
            onClick={generateFRQ}
            disabled={!selectedType || loadingFRQ}
            className="w-full py-3 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {loadingFRQ ? "Generating prompt..." : "Generate FRQ"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-6 rounded-sm border border-[#1e2240] bg-[#13162a] space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#c9a84c]" style={{ fontFamily: "var(--font-mono)" }}>
                {frq.type}
              </span>
              <span className="text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                · {frq.totalPoints} points
              </span>
            </div>
            <p className="text-[#f0ead6] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {frq.prompt}
            </p>
            {frq.parts && (
              <ul className="space-y-2 ml-4">
                {frq.parts.map((part, i) => (
                  <li key={i} className="text-sm text-[#8a8070]" style={{ fontFamily: "var(--font-body)" }}>
                    {part}
                  </li>
                ))}
              </ul>
            )}
            {frq.documents && frq.documents.length > 0 && (
              <div className="space-y-3 border-t border-[#1e2240] pt-4">
                <p className="text-xs text-[#c9a84c]" style={{ fontFamily: "var(--font-mono)" }}>
                  Documents
                </p>
                {frq.documents.map((doc, i) => (
                  <div key={i} className="p-3 border border-[#1e2240] rounded-sm">
                    <p className="text-xs text-[#c9a84c] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      {doc.label}
                    </p>
                    <p className="text-sm text-[#f0ead6] italic" style={{ fontFamily: "var(--font-body)" }}>
                      {doc.excerpt}
                    </p>
                    <p className="text-xs text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                      — {doc.attribution}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <textarea
              value={response}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder="Write your response here..."
              rows={14}
              className="w-full p-4 rounded-sm border border-[#1e2240] bg-[#13162a] text-[#f0ead6] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#c9a84c] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            />
            <div
              className="absolute bottom-3 right-3 text-xs text-[#8a8070]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {wordCount} words
            </div>
          </div>

          <button
            onClick={grade}
            disabled={!response.trim() || loadingGrade}
            className="w-full py-3 rounded-sm bg-[#c9a84c] text-[#0d0f1a] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {loadingGrade ? "Grading..." : "Submit for Grading"}
          </button>
        </div>
      )}
    </div>
  );
}
