export type SATFlashcard = {
  id: string;
  unit: string;
  unitName: string;
  section: "Reading & Writing" | "Math";
  front: string;
  back: string;
  tags: string[];
};

export const SAT_FLASHCARDS: SATFlashcard[] = [

  // ══════════════════════════════════════════════════════
  // READING & WRITING — Information & Ideas
  // ══════════════════════════════════════════════════════

  {
    id: "sat-rw-ii-fc-001",
    unit: "rw-info-ideas",
    unitName: "Information & Ideas",
    section: "Reading & Writing",
    front: "What is the difference between a 'central idea' question and an 'inference' question on the SAT?",
    back: "Central idea questions ask you to identify what the passage is mainly about — the explicit main point. Inference questions ask you to draw a logical conclusion that is strongly implied but not stated directly. Both must be grounded in the text; never choose an answer that goes beyond what the passage supports.",
    tags: ["reading strategy", "central idea", "inference"],
  },
  {
    id: "sat-rw-ii-fc-002",
    unit: "rw-info-ideas",
    unitName: "Information & Ideas",
    section: "Reading & Writing",
    front: "What does 'Command of Evidence (Textual)' mean on the SAT?",
    back: "You must identify the specific part of the text that best supports a given claim or conclusion. Look for direct, clear evidence in the passage — not evidence that merely is related to the topic. The correct answer will logically prove or strongly support the claim without requiring outside information.",
    tags: ["evidence", "reading strategy"],
  },
  {
    id: "sat-rw-ii-fc-003",
    unit: "rw-info-ideas",
    unitName: "Information & Ideas",
    section: "Reading & Writing",
    front: "What does 'Command of Evidence (Quantitative)' mean on the SAT?",
    back: "These questions pair a passage with a table, graph, or chart. You must use the data to support or challenge a claim made in the passage, or identify what the data shows. Always read axis labels, units, and headings carefully. Never choose an answer that requires information not shown in the data.",
    tags: ["evidence", "data", "graphs"],
  },
  {
    id: "sat-rw-ii-fc-004",
    unit: "rw-info-ideas",
    unitName: "Information & Ideas",
    section: "Reading & Writing",
    front: "How do you approach 'Cross-Text Connections' questions on the SAT?",
    back: "These questions give you two short passages (Text 1 and Text 2) that address a related topic. You must understand how the authors' claims relate — agree, disagree, qualify, or extend. Common question frames: 'How would the author of Text 2 respond to Text 1's claim?' Read both passages for their central argument before comparing.",
    tags: ["cross-text", "reading strategy", "paired passages"],
  },
  {
    id: "sat-rw-ii-fc-005",
    unit: "rw-info-ideas",
    unitName: "Information & Ideas",
    section: "Reading & Writing",
    front: "What trap answers appear most often on SAT reading comprehension questions?",
    back: "1. Too broad — correct topic but overgeneralizes beyond the passage\n2. Too narrow — only covers a detail, not the main point\n3. Opposite — reverses what the passage says\n4. Distortion — uses passage words but changes the meaning\n5. Out of scope — true in general but not supported by this passage\nAlways anchor your answer in specific text evidence.",
    tags: ["reading strategy", "trap answers"],
  },

  // ══════════════════════════════════════════════════════
  // READING & WRITING — Craft & Structure
  // ══════════════════════════════════════════════════════

  {
    id: "sat-rw-cs-fc-001",
    unit: "rw-craft",
    unitName: "Craft & Structure",
    section: "Reading & Writing",
    front: "How do you approach 'Words in Context' questions on the SAT?",
    back: "1. Read the full sentence (and often the surrounding context) — never just the word.\n2. Substitute your own word before looking at the choices.\n3. Pick the answer that fits the meaning and tone of the passage.\n4. Watch for 'false cognates' — common definitions of a word that don't fit the specific context.\nExample trap: 'champion' as a verb means 'to advocate for,' not just 'to win.'",
    tags: ["vocabulary", "words in context"],
  },
  {
    id: "sat-rw-cs-fc-002",
    unit: "rw-craft",
    unitName: "Craft & Structure",
    section: "Reading & Writing",
    front: "What does 'Text Structure and Purpose' mean on the SAT?",
    back: "These questions ask why the author included specific content — a detail, an example, a quote, a metaphor, or an entire paragraph. Typical question frames: 'The author mentions X primarily to…' or 'The main purpose of the passage is to…'\nFocus on the function, not just the content. What is the rhetorical job of that element?",
    tags: ["text structure", "author's purpose"],
  },
  {
    id: "sat-rw-cs-fc-003",
    unit: "rw-craft",
    unitName: "Craft & Structure",
    section: "Reading & Writing",
    front: "What is the difference between denotation and connotation, and why does it matter for SAT vocabulary questions?",
    back: "Denotation = the literal dictionary meaning of a word.\nConnotation = the associations, emotional weight, or implied meaning of a word.\nSAT Words in Context questions often test connotation — two words with similar denotations can have very different connotations. Example: 'assertive' vs. 'aggressive' both describe forceful behavior, but the former is positive and the latter negative. The right word must match the passage's tone.",
    tags: ["vocabulary", "connotation", "denotation"],
  },
  {
    id: "sat-rw-cs-fc-004",
    unit: "rw-craft",
    unitName: "Craft & Structure",
    section: "Reading & Writing",
    front: "List 10 high-frequency SAT vocabulary words and their meanings.",
    back: "1. Ephemeral — short-lived, temporary\n2. Equivocal — ambiguous, open to multiple interpretations\n3. Mitigate — to reduce the severity of\n4. Pragmatic — practical, focused on results\n5. Reticent — reluctant to speak; reserved\n6. Tenuous — weak, thin, insubstantial\n7. Ubiquitous — present everywhere\n8. Verbose — using more words than necessary\n9. Corroborate — to confirm or support\n10. Perfunctory — done with minimal effort; careless",
    tags: ["vocabulary", "high-frequency words"],
  },
  {
    id: "sat-rw-cs-fc-005",
    unit: "rw-craft",
    unitName: "Craft & Structure",
    section: "Reading & Writing",
    front: "List 10 more high-frequency SAT vocabulary words and their meanings.",
    back: "1. Ambiguous — open to more than one interpretation\n2. Contentious — causing disagreement; controversial\n3. Cursory — hasty, done without thoroughness\n4. Didactic — intended to teach or instruct\n5. Enigmatic — mysterious, hard to understand\n6. Frivolous — not serious; trivial\n7. Nuanced — showing subtle distinctions\n8. Plausible — seeming reasonable or probable\n9. Skeptical — having doubts; questioning\n10. Validate — to confirm; to prove true",
    tags: ["vocabulary", "high-frequency words"],
  },

  // ══════════════════════════════════════════════════════
  // READING & WRITING — Expression of Ideas
  // ══════════════════════════════════════════════════════

  {
    id: "sat-rw-ei-fc-001",
    unit: "rw-expression",
    unitName: "Expression of Ideas",
    section: "Reading & Writing",
    front: "What is a 'Rhetorical Synthesis' question on the SAT?",
    back: "You are given a set of bullet-point notes (as if written by a student) and asked to write a sentence or paragraph that accomplishes a specific goal — e.g., 'compare two things,' 'introduce a counterargument,' or 'describe the most surprising finding.'\nStrategy: Identify the goal precisely, then find the answer that includes all relevant information and no irrelevant information. Avoid answers that add information not in the notes.",
    tags: ["rhetorical synthesis", "writing"],
  },
  {
    id: "sat-rw-ei-fc-002",
    unit: "rw-expression",
    unitName: "Expression of Ideas",
    section: "Reading & Writing",
    front: "What are the most common SAT transition words and what relationships do they signal?",
    back: "CONTRAST: however, yet, but, although, while, despite, in contrast, on the other hand\nADDITION: furthermore, moreover, in addition, also, additionally\nCONSEQUENCE: therefore, thus, as a result, consequently, hence\nCONCESSION: admittedly, of course, granted\nEXEMPLIFICATION: for example, for instance, specifically, namely\nEMPHASIS: indeed, in fact, certainly\nStrategy: Identify the logical relationship between the two ideas, then match to the correct transition category.",
    tags: ["transitions", "writing"],
  },
  {
    id: "sat-rw-ei-fc-003",
    unit: "rw-expression",
    unitName: "Expression of Ideas",
    section: "Reading & Writing",
    front: "When is a colon used correctly in Standard English?",
    back: "A colon is used after a complete independent clause to introduce:\n• A list: 'She bought three items: milk, eggs, and bread.'\n• An explanation or elaboration: 'The answer was clear: he had lied.'\n• A quotation: 'The sign read: No Entry.'\n\nNEVER use a colon after a verb or preposition:\n✗ 'The menu includes: pasta, pizza, and salad.'\n✓ 'The menu includes three items: pasta, pizza, and salad.'",
    tags: ["punctuation", "colon", "grammar"],
  },
  {
    id: "sat-rw-ei-fc-004",
    unit: "rw-expression",
    unitName: "Expression of Ideas",
    section: "Reading & Writing",
    front: "What is the difference between 'however' (with a semicolon) and 'but' (with a comma) as transitions?",
    back: "'However' is a conjunctive adverb. It requires a semicolon before it (or a period) and a comma after it when connecting two independent clauses:\n✓ 'The data was incomplete; however, the team proceeded.'\n\n'But' is a coordinating conjunction. It takes only a comma before it:\n✓ 'The data was incomplete, but the team proceeded.'\n\nUsing 'however' with just a comma creates a comma splice (a common SAT grammar error):\n✗ 'The data was incomplete, however the team proceeded.'",
    tags: ["punctuation", "transitions", "grammar"],
  },

  // ══════════════════════════════════════════════════════
  // READING & WRITING — Standard English Conventions
  // ══════════════════════════════════════════════════════

  {
    id: "sat-rw-sec-fc-001",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "What is a comma splice and how do you fix it?",
    back: "A comma splice joins two independent clauses with only a comma:\n✗ 'It was raining, we stayed inside.'\n\nFixes:\n1. Use a period: 'It was raining. We stayed inside.'\n2. Use a semicolon: 'It was raining; we stayed inside.'\n3. Add a coordinating conjunction: 'It was raining, so we stayed inside.'\n4. Use a subordinating conjunction: 'Because it was raining, we stayed inside.'",
    tags: ["comma splice", "grammar", "punctuation"],
  },
  {
    id: "sat-rw-sec-fc-002",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "What is subject-verb agreement and what are the most common traps on the SAT?",
    back: "The verb must agree with its subject in number (singular/plural).\n\nCommon traps:\n1. Intervening phrase: 'The team, along with its coaches, [is/are] ready.' → Subject is 'team' (singular) → 'is'\n2. Inverted sentence: 'On the shelf [is/are] several books.' → Subject is 'books' (plural) → 'are'\n3. Collective nouns: 'The committee [has/have] reached a decision.' → Singular in American English → 'has'\n4. Neither/nor: Verb agrees with the CLOSER subject: 'Neither the students nor the teacher [is/are] ready.' → 'is'",
    tags: ["subject-verb agreement", "grammar"],
  },
  {
    id: "sat-rw-sec-fc-003",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "What is the difference between 'its,' 'it's,' 'their,' 'there,' and 'they're'?",
    back: "its — possessive pronoun: 'The dog wagged its tail.'\nit's — contraction for 'it is': 'It's a beautiful day.'\n\ntheir — possessive pronoun: 'They forgot their books.'\nthere — place adverb or expletive: 'Put it over there.' / 'There is a problem.'\nthey're — contraction for 'they are': 'They're coming tonight.'\n\nTest: substitute the full form. If 'it is' or 'they are' makes sense → use the contraction. Otherwise → use the possessive.",
    tags: ["pronouns", "contractions", "grammar"],
  },
  {
    id: "sat-rw-sec-fc-004",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "What is a restrictive vs. nonrestrictive clause and how does punctuation differ?",
    back: "Restrictive clause — essential to the sentence's meaning. No commas.\n✓ 'The student who studied hardest passed.' (identifies which student)\n\nNonrestrictive clause — extra information that can be removed. Use commas.\n✓ 'My brother, who lives in Boston, is visiting.' (just adds info about my brother)\n\nKey words: 'that' introduces restrictive clauses; 'which' introduces nonrestrictive clauses (with commas).",
    tags: ["relative clauses", "punctuation", "grammar"],
  },
  {
    id: "sat-rw-sec-fc-005",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "What is a dangling modifier and how do you identify and fix it?",
    back: "A dangling modifier is a phrase that doesn't logically connect to the subject it's intended to modify:\n✗ 'Running down the street, the bus passed me.' (The bus wasn't running.)\n✓ 'Running down the street, I watched the bus pass.'\n\nTest: Ask 'who or what is doing the action in the modifier?' That noun must be the sentence's subject.\nCommon SAT form: participial phrases at the start of a sentence ('Having completed the test, ...' / 'While studying, ...').",
    tags: ["modifiers", "grammar"],
  },
  {
    id: "sat-rw-sec-fc-006",
    unit: "rw-conventions",
    unitName: "Standard English Conventions",
    section: "Reading & Writing",
    front: "When should you use a semicolon vs. a comma vs. a period between clauses?",
    back: "Period — separates two independent clauses into full sentences.\nSemicolon — separates two closely related independent clauses without a conjunction:\n✓ 'She studied hard; she passed the exam.'\nComma + coordinating conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So):\n✓ 'She studied hard, so she passed the exam.'\n\n✗ Comma alone between two independent clauses = comma splice.\n✗ Semicolon before a phrase (not an independent clause) = incorrect.",
    tags: ["punctuation", "semicolon", "grammar"],
  },

  // ══════════════════════════════════════════════════════
  // MATH — Algebra
  // ══════════════════════════════════════════════════════

  {
    id: "sat-math-alg-fc-001",
    unit: "math-algebra",
    unitName: "Algebra",
    section: "Math",
    front: "How do you solve a system of two linear equations?",
    back: "METHOD 1 — Substitution:\nSolve one equation for one variable, then substitute into the other.\n\nMETHOD 2 — Elimination (Addition/Subtraction):\nMultiply equations to make one variable's coefficients equal, then add or subtract to eliminate it.\n\nExample: 2x + y = 10 and x − y = 2.\nAdd: 3x = 12 → x = 4 → y = 2.\n\nSpecial cases:\n• No solution → parallel lines (same slope, different y-intercept)\n• Infinite solutions → same line (identical equations)",
    tags: ["systems of equations", "algebra"],
  },
  {
    id: "sat-math-alg-fc-002",
    unit: "math-algebra",
    unitName: "Algebra",
    section: "Math",
    front: "What is slope-intercept form and how do you use it?",
    back: "y = mx + b\n• m = slope = rise/run = (y₂ − y₁)/(x₂ − x₁)\n• b = y-intercept (where the line crosses the y-axis)\n\nTo find the equation of a line:\n1. Calculate slope m from two points.\n2. Substitute one point and m into y = mx + b to solve for b.\n\nKey relationships:\n• Parallel lines → same slope\n• Perpendicular lines → slopes are negative reciprocals (m₁ × m₂ = −1)",
    tags: ["linear functions", "slope", "algebra"],
  },
  {
    id: "sat-math-alg-fc-003",
    unit: "math-algebra",
    unitName: "Algebra",
    section: "Math",
    front: "How do you solve absolute value equations?",
    back: "|expression| = k (where k ≥ 0) means:\nCase 1: expression = k\nCase 2: expression = −k\n\nExample: |2x − 3| = 7\nCase 1: 2x − 3 = 7 → x = 5\nCase 2: 2x − 3 = −7 → x = −2\n\nFor inequalities:\n|x| < k → −k < x < k (between)\n|x| > k → x < −k OR x > k (outside)",
    tags: ["absolute value", "algebra"],
  },
  {
    id: "sat-math-alg-fc-004",
    unit: "math-algebra",
    unitName: "Algebra",
    section: "Math",
    front: "What are the key steps for solving linear inequalities?",
    back: "Solve like a linear equation, with one critical rule:\n• When you MULTIPLY or DIVIDE both sides by a NEGATIVE number, FLIP the inequality sign.\n\nExample: −2x > 8 → x < −4 (sign flipped when dividing by −2)\n\nGraphing:\n• < or > → open circle on number line\n• ≤ or ≥ → closed (filled) circle\n\nSystems of inequalities: graph both and find the overlapping region.",
    tags: ["inequalities", "algebra"],
  },

  // ══════════════════════════════════════════════════════
  // MATH — Advanced Math
  // ══════════════════════════════════════════════════════

  {
    id: "sat-math-adv-fc-001",
    unit: "math-advanced",
    unitName: "Advanced Math",
    section: "Math",
    front: "What are the three forms of a quadratic equation and when do you use each?",
    back: "1. Standard form: y = ax² + bx + c\n   Use for: finding y-intercept (c), using the quadratic formula, calculating discriminant\n\n2. Vertex form: y = a(x − h)² + k\n   Use for: finding the vertex (h, k) and axis of symmetry x = h\n\n3. Factored form: y = a(x − r₁)(x − r₂)\n   Use for: finding x-intercepts/zeros (x = r₁ and x = r₂)\n\nConversion tip: Complete the square to convert from standard to vertex form.",
    tags: ["quadratics", "advanced math"],
  },
  {
    id: "sat-math-adv-fc-002",
    unit: "math-advanced",
    unitName: "Advanced Math",
    section: "Math",
    front: "What is the quadratic formula and when should you use it?",
    back: "x = (−b ± √(b² − 4ac)) / (2a)\n\nUse when a quadratic cannot be easily factored.\n\nDiscriminant (b² − 4ac):\n• > 0 → two distinct real solutions\n• = 0 → exactly one real solution (double root)\n• < 0 → no real solutions (two complex solutions)\n\nMemory trick: 'x equals negative b, plus or minus root of b squared minus four ac, all over two a.'",
    tags: ["quadratic formula", "discriminant", "advanced math"],
  },
  {
    id: "sat-math-adv-fc-003",
    unit: "math-advanced",
    unitName: "Advanced Math",
    section: "Math",
    front: "What are the key exponent rules you need for the SAT?",
    back: "Product: aᵐ × aⁿ = aᵐ⁺ⁿ\nQuotient: aᵐ / aⁿ = aᵐ⁻ⁿ\nPower of a power: (aᵐ)ⁿ = aᵐⁿ\nZero exponent: a⁰ = 1 (a ≠ 0)\nNegative exponent: a⁻ⁿ = 1/aⁿ\nFractional exponent: a^(m/n) = ⁿ√(aᵐ)\n\nExamples:\n8^(2/3) = (∛8)² = 2² = 4\n2⁻³ = 1/8",
    tags: ["exponents", "advanced math"],
  },
  {
    id: "sat-math-adv-fc-004",
    unit: "math-advanced",
    unitName: "Advanced Math",
    section: "Math",
    front: "What is the Factor Theorem and how do you use it?",
    back: "If p(a) = 0, then (x − a) is a factor of polynomial p(x).\n\nTo find a factor, test values of x:\n• If p(2) = 0 → (x − 2) is a factor\n• If p(−3) = 0 → (x + 3) is a factor\n\nUseful SAT approach: Test the x-values given in the answer choices in the polynomial until you find a zero. Then the corresponding factor is correct.",
    tags: ["polynomials", "factor theorem", "advanced math"],
  },
  {
    id: "sat-math-adv-fc-005",
    unit: "math-advanced",
    unitName: "Advanced Math",
    section: "Math",
    front: "How do you evaluate composite functions like f(g(x))?",
    back: "Work from the inside out:\n1. First evaluate the inner function g(x) at the given value.\n2. Then substitute that result into the outer function f.\n\nExample: f(x) = x² + 1, g(x) = 2x − 3. Find f(g(4)).\nStep 1: g(4) = 2(4) − 3 = 5\nStep 2: f(5) = 5² + 1 = 26\n\nDon't multiply — substitute.",
    tags: ["composite functions", "function notation", "advanced math"],
  },

  // ══════════════════════════════════════════════════════
  // MATH — Problem-Solving & Data Analysis
  // ══════════════════════════════════════════════════════

  {
    id: "sat-math-psda-fc-001",
    unit: "math-psda",
    unitName: "Problem-Solving & Data Analysis",
    section: "Math",
    front: "What is the difference between mean, median, and mode?",
    back: "Mean — the average: sum of values ÷ number of values\nMedian — the middle value when data is ordered (for even count, average the two middle values)\nMode — the value that appears most often\n\nKey SAT insights:\n• Mean is affected by outliers; median is not\n• Adding/removing values affects the mean but may not change the median\n• A question may ask which measure changes when an outlier is added — usually the mean changes more",
    tags: ["statistics", "mean", "median", "mode"],
  },
  {
    id: "sat-math-psda-fc-002",
    unit: "math-psda",
    unitName: "Problem-Solving & Data Analysis",
    section: "Math",
    front: "How do you solve percent increase and percent decrease problems?",
    back: "Percent change = (new − old) / old × 100%\n\nPercent increase: final = original × (1 + r)\nPercent decrease: final = original × (1 − r)\n\nWhere r is the decimal form of the percent.\n\nExample: A $80 item is discounted 25%.\nSale price = 80 × (1 − 0.25) = 80 × 0.75 = $60\n\nTrap: A 20% increase followed by a 20% decrease does NOT return to the original value.",
    tags: ["percentages", "data analysis"],
  },
  {
    id: "sat-math-psda-fc-003",
    unit: "math-psda",
    unitName: "Problem-Solving & Data Analysis",
    section: "Math",
    front: "How do you interpret a scatterplot and line of best fit on the SAT?",
    back: "Line of best fit (linear regression):\n• Positive association → line slopes upward\n• Negative association → line slopes downward\n• Strong association → points cluster close to line\n\nUsing the equation y = mx + b:\n• Substitute x to predict y\n• The slope m = the rate of change (increase/decrease per unit of x)\n• The y-intercept b = the predicted y when x = 0\n\nNever extrapolate far beyond the data range — predict cautiously.",
    tags: ["scatterplot", "linear models", "data analysis"],
  },
  {
    id: "sat-math-psda-fc-004",
    unit: "math-psda",
    unitName: "Problem-Solving & Data Analysis",
    section: "Math",
    front: "How do you solve SAT probability questions?",
    back: "Basic probability: P(event) = favorable outcomes / total outcomes\n\nComplement rule: P(not A) = 1 − P(A)\n\nAnd (both events, independent): P(A and B) = P(A) × P(B)\n\nOr (either event): P(A or B) = P(A) + P(B) − P(A and B)\n\nConditional probability: P(A|B) = P(A and B) / P(B)\n\nFor SAT two-way tables: P(A|B) = (value in cell) / (total in that row or column, depending on condition)",
    tags: ["probability", "data analysis"],
  },

  // ══════════════════════════════════════════════════════
  // MATH — Geometry & Trigonometry
  // ══════════════════════════════════════════════════════

  {
    id: "sat-math-geo-fc-001",
    unit: "math-geometry",
    unitName: "Geometry & Trigonometry",
    section: "Math",
    front: "What key geometry formulas are provided on the SAT reference sheet?",
    back: "The SAT provides these formulas at the start of each math module:\n• Circle: A = πr², C = 2πr\n• Rectangle: A = lw\n• Triangle: A = ½bh\n• Pythagorean theorem: a² + b² = c²\n• Special right triangles: 30-60-90 (sides 1, √3, 2) and 45-45-90 (sides 1, 1, √2)\n• Rectangular solid: V = lwh\n• Cylinder: V = πr²h\n• Sphere: V = (4/3)πr³\n• Cone: V = (1/3)πr²h\n• Pyramid: V = (1/3)lwh\nAlso: 360° in a circle, 180° in a triangle.",
    tags: ["geometry formulas", "reference sheet"],
  },
  {
    id: "sat-math-geo-fc-002",
    unit: "math-geometry",
    unitName: "Geometry & Trigonometry",
    section: "Math",
    front: "What are the three basic trigonometric ratios and how do you remember them?",
    back: "SOH-CAH-TOA:\nSin(θ) = Opposite / Hypotenuse\nCos(θ) = Adjacent / Hypotenuse\nTan(θ) = Opposite / Adjacent\n\nUsed in right triangles. Label the triangle relative to the given angle:\n• Hypotenuse = side opposite the right angle (always longest)\n• Opposite = side across from the angle\n• Adjacent = side next to the angle (not the hypotenuse)\n\nKey values to know:\nsin(30°) = 1/2, cos(30°) = √3/2\nsin(45°) = cos(45°) = √2/2\nsin(60°) = √3/2, cos(60°) = 1/2",
    tags: ["trigonometry", "SOH-CAH-TOA"],
  },
  {
    id: "sat-math-geo-fc-003",
    unit: "math-geometry",
    unitName: "Geometry & Trigonometry",
    section: "Math",
    front: "What are the properties of special right triangles?",
    back: "30-60-90 triangle (sides in ratio 1 : √3 : 2):\n• Side opposite 30° = x\n• Side opposite 60° = x√3\n• Hypotenuse = 2x\n\n45-45-90 triangle (sides in ratio 1 : 1 : √2):\n• Two legs = x each\n• Hypotenuse = x√2\n\nThese ratios appear on the SAT reference sheet. Memorize them — they're used frequently in geometry and trig problems.",
    tags: ["special right triangles", "geometry"],
  },
  {
    id: "sat-math-geo-fc-004",
    unit: "math-geometry",
    unitName: "Geometry & Trigonometry",
    section: "Math",
    front: "What is the standard equation of a circle and what does each part represent?",
    back: "(x − h)² + (y − k)² = r²\n\n• Center: (h, k)\n• Radius: r\n\nIf the equation looks like x² + y² + Dx + Ey + F = 0, complete the square to convert to standard form.\n\nExample: x² + y² − 6x + 4y − 3 = 0\n(x − 3)² + (y + 2)² = 16\nCenter: (3, −2), Radius: 4",
    tags: ["circles", "geometry", "coordinate geometry"],
  },
  {
    id: "sat-math-geo-fc-005",
    unit: "math-geometry",
    unitName: "Geometry & Trigonometry",
    section: "Math",
    front: "How do you find arc length and sector area?",
    back: "Arc length = (θ/360°) × 2πr\nSector area = (θ/360°) × πr²\n\nWhere θ is the central angle in degrees and r is the radius.\n\nIn radians: arc length = rθ, sector area = (1/2)r²θ\n\nExample: Circle with radius 6, central angle 120°\nArc length = (120/360) × 2π(6) = (1/3)(12π) = 4π\nSector area = (120/360) × π(36) = (1/3)(36π) = 12π",
    tags: ["arc length", "sector area", "geometry"],
  },
];
