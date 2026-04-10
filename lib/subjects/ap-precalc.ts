export const AP_PRECALC = {
  id: "ap-precalc",
  name: "AP Precalculus",
  examDate: "May 2025",
  totalUnits: 4,
  units: [
    { id: "unit-1", name: "Polynomial & Rational Functions", weight: "30–40%", examWeight: 35 },
    { id: "unit-2", name: "Exponential & Logarithmic Functions", weight: "27–40%", examWeight: 33.5 },
    { id: "unit-3", name: "Trigonometric & Polar Functions", weight: "30–35%", examWeight: 32.5 },
    { id: "unit-4", name: "Functions Involving Parameters, Vectors & Matrices", weight: "Not on AP Exam — Explore only", examWeight: 0 },
  ],
  frqTypes: [
    {
      id: "frq",
      name: "Free Response Question",
      description: "4 FRQs — mix of calculator and no-calculator. Focus on justification, modeling, and analysis.",
      count: 4,
      points: 12,
      rubricCategories: ["Setup/Approach", "Mathematical Work", "Answer with Justification"],
    },
  ],
  mcqCount: 40,
  mcqTime: 80,
};
