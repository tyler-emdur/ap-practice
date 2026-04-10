export function buildFRQPrompt(subject: string, frqType: string, unit?: string) {
  const unitContext = unit ? `, focusing on ${unit}` : "";

  return `You are an AP exam question writer. Generate one authentic ${frqType} question for ${subject}${unitContext}.

Base this on the style and difficulty of real College Board released questions. The question should:
- Mirror the exact format and verb choices used on the actual AP exam (e.g. "Explain," "Describe," "Evaluate," "Identify")
- For AP World DBQ: provide 7 abbreviated but realistic document excerpts with attributions (author, date, context)
- For AP World LEQ/SAQ: be historically specific and testable
- For AP CSP: reference realistic program scenarios or computing innovations
- For AP Precalc: include a realistic modeling context with necessary data or graph descriptions

Respond ONLY with JSON, no markdown fences:
{
  "id": "frq-001",
  "type": "${frqType}",
  "subject": "${subject}",
  "prompt": "...",
  "parts": ["(a) ...", "(b) ...", "(c) ..."],
  "documents": [],
  "totalPoints": 6,
  "rubric": {
    "category_name": { "points": 1, "criteria": "..." }
  },
  "scoringNotes": "What strong responses typically include."
}`;
}
