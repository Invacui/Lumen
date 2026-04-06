# Pocket Comet Expense Lab

A frontend-only finance tracking dashboard built with React, Vite, TypeScript, Tailwind, Redux Toolkit, TanStack Query, and React Hook Form.

This app lets you:
- sign in (Google OAuth or demo users)
- view balance, income, expense, and spending breakdown charts
- filter transactions by type/category/date/search
- add/edit/delete transactions (admin role only)
- view insights such as top category and biggest transaction

## Stack

- React 18 + Vite 5 + TypeScript (strict)
- Tailwind CSS + shadcn/ui components
- Redux Toolkit for app state (auth, UI, filters)
- TanStack Query for async/mock API state
- React Hook Form with rules from `src/lib/validationRules.ts` (no Zod in finance forms)
- Recharts for dashboard/insights charts

## Quick Start

```bash
npm install
npm run dev
```

App runs on [http://localhost:5173](http://localhost:5173)

## Environment Variables

Create `environments/.env.local`:

```bash
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=http://localhost:3000
```

Notes:
- `VITE_GOOGLE_CLIENT_ID` enables Google Sign-In.
- If missing, you can still use Demo Viewer/Admin login.
- Data is mocked locally; no real backend is required.

## Scripts

```bash
npm run dev         # local development
npm run build       # production build
npm run preview     # preview built app
npm test            # run vitest
npm run test:ui     # run vitest UI
```

## App Routes

- `/login`
- `/dashboard`
- `/transactions`
- `/insights`

## Roles

- `viewer`: read-only analytics and transaction list
- `admin`: can add/edit/delete transactions

Use the topbar role switcher to demo both experiences.