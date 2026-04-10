export const SAT = {
  id: "sat",
  name: "SAT",
  examDate: "2026",
  totalUnits: 8,
  units: [
    // Reading & Writing
    { id: "rw-info-ideas",     name: "Information & Ideas",           section: "Reading & Writing", weight: "~26%", examWeight: 26 },
    { id: "rw-craft",          name: "Craft & Structure",             section: "Reading & Writing", weight: "~28%", examWeight: 28 },
    { id: "rw-expression",     name: "Expression of Ideas",           section: "Reading & Writing", weight: "~20%", examWeight: 20 },
    { id: "rw-conventions",    name: "Standard English Conventions",  section: "Reading & Writing", weight: "~26%", examWeight: 26 },
    // Math
    { id: "math-algebra",      name: "Algebra",                       section: "Math", weight: "~35%", examWeight: 35 },
    { id: "math-advanced",     name: "Advanced Math",                 section: "Math", weight: "~35%", examWeight: 35 },
    { id: "math-psda",         name: "Problem-Solving & Data Analysis", section: "Math", weight: "~15%", examWeight: 15 },
    { id: "math-geometry",     name: "Geometry & Trigonometry",       section: "Math", weight: "~15%", examWeight: 15 },
  ],
  frqTypes: [] as never[],
  mcqCount: 98,   // 54 RW + 44 Math
  mcqTime: 134,   // 64 min RW + 70 min Math
  sections: [
    {
      id: "reading-writing",
      name: "Reading & Writing",
      modules: 2,
      questionsPerModule: 27,
      minutesPerModule: 32,
      domains: ["rw-info-ideas", "rw-craft", "rw-expression", "rw-conventions"],
    },
    {
      id: "math",
      name: "Math",
      modules: 2,
      questionsPerModule: 22,
      minutesPerModule: 35,
      domains: ["math-algebra", "math-advanced", "math-psda", "math-geometry"],
    },
  ],
};
