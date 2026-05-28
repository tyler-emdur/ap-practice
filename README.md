# APex

AP exam study platform for AP World History: Modern, AP Computer Science Principles, and AP Precalculus. APex combines large static flashcard and MCQ banks with AI-graded free-response practice — so rote drilling is instant and free, while FRQ feedback is powered by Gemini. Features per-unit progress tracking, spaced repetition, unit selector filters, and a dark academic UI built for long study sessions.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Auth**: Clerk
- **Database**: Neon Postgres + Prisma ORM
- **AI**: Google Gemini API (FRQ generation and grading)
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## Setup

### 1. Install dependencies

```bash
cd apex
npm install
```

### 2. Configure environment variables

Create `.env.local` in the `apex/` directory:

```
# Clerk — from clerk.com dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Gemini — from Google AI Studio (aistudio.google.com)
GEMINI_API_KEY=

# Neon Postgres — from neon.tech dashboard
DATABASE_URL=

# Vercel Blob — from Vercel dashboard
BLOB_READ_WRITE_TOKEN=
```

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

### Static question banks
MCQ and flashcard content lives in `lib/banks/ap-world/` — 180+ flashcards and 135+ MCQ questions across all 9 AP World units. No AI call, no latency.

### FRQ practice
SAQs, DBQs, and LEQs are generated and graded via Gemini using rubrics modeled on real College Board scoring guidelines. Results are persisted to Postgres for progress tracking.

### Unit filtering
Every study mode (flashcards, MCQ, FRQ) exposes a unit selector so you can drill one unit or cross-unit combinations. MCQ sessions let you choose 10 / 25 / 50 questions from a shuffled pool.

## Status

**Active** — last updated April 2026.
