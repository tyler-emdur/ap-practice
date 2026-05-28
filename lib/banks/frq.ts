import { getSubject } from "@/lib/subjects";

type StaticFrqSeed = {
  subjectId: string;
  frqType: string;
  prompt: string;
  parts?: string[];
  documents?: Array<{ label: string; excerpt: string; attribution: string }>;
  rubric?: Record<string, { points: number; criteria: string }>;
  totalPoints?: number;
  scoringNotes?: string;
};

const STATIC_FRQ_SEEDS: StaticFrqSeed[] = [
  {
    subjectId: "ap-world",
    frqType: "Short Answer Question (SAQ)",
    prompt:
      "Answer all parts of the question that follows. The period from 1750 to 1900 saw both continuity and change in labor systems around the world.",
    parts: [
      "(a) Describe ONE way industrialization changed labor systems in this period.",
      "(b) Describe ONE way labor systems remained continuous despite industrialization in this period.",
      "(c) Explain ONE way imperial expansion affected labor systems in this period.",
    ],
    totalPoints: 3,
    rubric: {
      "Part (a)": { points: 1, criteria: "Accurately describes one change in labor systems tied to industrialization." },
      "Part (b)": { points: 1, criteria: "Accurately describes one continuity in labor systems." },
      "Part (c)": { points: 1, criteria: "Explains one effect of imperial expansion on labor systems." },
    },
    scoringNotes: "Strong responses use specific historical evidence and causal language.",
  },
  {
    subjectId: "ap-world",
    frqType: "Long Essay Question (LEQ)",
    prompt:
      "Evaluate the extent to which nationalist movements transformed states and societies in the period 1750 to 1900.",
    totalPoints: 6,
    rubric: {
      Thesis: { points: 1, criteria: "Presents a defensible claim that evaluates degree of transformation." },
      Contextualization: { points: 1, criteria: "Situates nationalism in broader historical developments of the era." },
      Evidence: { points: 2, criteria: "Uses specific examples to support argument." },
      "Analysis and Reasoning": { points: 2, criteria: "Demonstrates complexity and historical reasoning." },
    },
    scoringNotes: "Top essays compare regions and discuss both transformation and limits.",
  },
  {
    subjectId: "ap-csp",
    frqType: "Written Response 1 — Program Design",
    prompt:
      "Describe a program that you developed or studied that takes input, processes data, and produces output for a user.",
    parts: [
      "(a) Describe the program's purpose and intended user.",
      "(b) Explain one algorithm in the program that uses sequencing, selection, and iteration.",
      "(c) Explain how data abstraction is used in the program and why it is beneficial.",
    ],
    totalPoints: 6,
    rubric: {
      "Program Purpose": { points: 2, criteria: "Clearly describes purpose, input, and output." },
      Algorithm: { points: 2, criteria: "Correctly explains sequencing, selection, and iteration." },
      Abstraction: { points: 2, criteria: "Explains data abstraction and benefit." },
    },
    scoringNotes: "High-scoring responses are specific about logic and variables.",
  },
  {
    subjectId: "ap-precalc",
    frqType: "Free Response Question",
    prompt:
      "A startup models its weekly subscriptions with a function S(t), where t is weeks since launch. Analyze the function behavior and justify your conclusions.",
    parts: [
      "(a) Determine an average rate of change over a stated interval and interpret it in context.",
      "(b) Identify an interval where the function is increasing or decreasing and justify.",
      "(c) Use the model to make and justify a prediction outside the observed interval.",
    ],
    totalPoints: 12,
    rubric: {
      Setup: { points: 4, criteria: "Appropriate setup and use of function notation." },
      Work: { points: 4, criteria: "Correct calculations and reasoning." },
      Justification: { points: 4, criteria: "Interpretation and contextual justification are sound." },
    },
    scoringNotes: "Strong responses clearly connect function features to real-world meaning.",
  },
];

export function getStaticFrq(subjectId: string, frqType: string, unit?: string) {
  const subject = getSubject(subjectId);
  if (!subject) return null;

  const candidates = STATIC_FRQ_SEEDS.filter((seed) => seed.subjectId === subjectId && seed.frqType === frqType);
  if (candidates.length === 0) return null;

  const selected = candidates[Math.floor(Math.random() * candidates.length)];
  const suffix = unit ? ` Focus your examples on ${unit}.` : "";

  return {
    id: `frq-${Date.now()}`,
    type: frqType,
    subject: subject.name,
    prompt: `${selected.prompt}${suffix}`,
    parts: selected.parts ?? null,
    documents: selected.documents ?? [],
    totalPoints: selected.totalPoints ?? 6,
    rubric: selected.rubric ?? {
      "Core Content": { points: 3, criteria: "Demonstrates relevant and accurate content knowledge." },
      Reasoning: { points: 3, criteria: "Applies course reasoning and supports claims with evidence." },
    },
    scoringNotes: selected.scoringNotes ?? "Use specific evidence and clear reasoning.",
  };
}
