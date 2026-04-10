export function buildMCQPrompt(subject: string, unit: string, count: number = 10) {
  return `You are an AP exam question writer trained on College Board materials. Generate ${count} rigorous multiple choice questions for ${subject}, Unit: ${unit}.

Each question must:
- Match the difficulty and style of real AP exam questions
- Have exactly 4 answer choices (A, B, C, D)
- Include one definitively correct answer
- Have plausible distractors that target common misconceptions
- For AP World: include stimulus-based questions (primary sources, maps, graphs) where appropriate
- For AP CSP: include code traces, algorithm analysis, or computing impact scenarios
- For AP Precalc: include graph interpretation and mathematical modeling

Respond ONLY with a JSON array, no markdown fences:
[
  {
    "id": "q1",
    "question": "...",
    "stimulus": "...",
    "choices": {
      "A": "...",
      "B": "...",
      "C": "...",
      "D": "..."
    },
    "correct": "A",
    "explanation": "Why the correct answer is right and why the distractors are wrong.",
    "skill": "...",
    "difficulty": "medium"
  }
]`;
}
