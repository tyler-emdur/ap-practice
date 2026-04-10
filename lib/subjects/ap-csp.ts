export const AP_CSP = {
  id: "ap-csp",
  name: "AP Computer Science Principles",
  examDate: "May 2025",
  totalUnits: 5,
  units: [
    { id: "unit-1", name: "Creative Development", weight: "10–13%", examWeight: 11.5 },
    { id: "unit-2", name: "Data", weight: "17–22%", examWeight: 19.5 },
    { id: "unit-3", name: "Algorithms & Programming", weight: "30–35%", examWeight: 32.5 },
    { id: "unit-4", name: "Computer Systems & Networks", weight: "11–15%", examWeight: 13 },
    { id: "unit-5", name: "Impact of Computing", weight: "21–26%", examWeight: 23.5 },
  ],
  frqTypes: [
    {
      id: "written-response-1",
      name: "Written Response 1 — Program Design",
      description: "Describe your Create Task program: purpose, function, algorithm with sequencing/selection/iteration.",
      points: 6,
      rubricCategories: ["Program Purpose", "Code Functionality", "Algorithm Description", "Abstraction"],
    },
    {
      id: "written-response-2",
      name: "Written Response 2 — Data & Impact",
      description: "Describe how data is used in your program and analyze a computing innovation's beneficial/harmful effects.",
      points: 6,
      rubricCategories: ["Data Description", "Data Analysis", "Beneficial Effects", "Harmful Effects", "Mitigation"],
    },
  ],
  mcqCount: 70,
  mcqTime: 120,
};
