export function buildGradingPrompt(
  subject: string,
  frqType: string,
  rubric: object,
  prompt: string,
  studentResponse: string
) {
  return `You are an experienced AP exam reader trained by College Board. Grade this ${frqType} response for ${subject}.

ORIGINAL PROMPT:
${prompt}

OFFICIAL RUBRIC:
${JSON.stringify(rubric, null, 2)}

STUDENT RESPONSE:
${studentResponse}

Grade strictly but fairly, exactly as a College Board AP reader would. Apply the rubric point by point.

Respond ONLY with JSON, no markdown fences:
{
  "totalPoints": 6,
  "earnedPoints": 4,
  "score": 0.67,
  "breakdown": {
    "category_name": {
      "earned": 1,
      "possible": 1,
      "feedback": "Specific explanation of what the student did or didn't do."
    }
  },
  "overallFeedback": "2-3 sentence summary of strengths and most important areas to improve.",
  "strongElements": ["..."],
  "improvementAreas": ["..."],
  "modelResponseHints": "What a full-credit response would have included."
}`;
}
