# CourtVision

## Product Overview

CourtVision is a modern NBA analytics platform for exploring player statistics, team performance, and historical trends through an intuitive, data-rich interface.

It should feel like a premium analytics product — comparable to StatMuse, ESPN Analytics, Linear, and the Vercel Dashboard — not a CRUD tutorial or a generic stats viewer. Every UI decision should prioritize usability, performance, and maintainability, and the codebase should demonstrate senior-level React/TypeScript engineering: scalable component architecture, responsive design, advanced data visualization, and efficient API-driven data workflows.

## Product Goals

Users should be able to:

- Discover NBA players and teams
- Explore detailed player statistics and career history
- Analyze historical performance trends
- Compare players side-by-side
- View team analytics and standings
- Search and filter basketball data quickly
- Save favorite players and teams

Prioritize: beautiful data visualization, fast interactions, clean information hierarchy, responsive design, and maintainable frontend architecture.

## Target Users

Basketball fans who enjoy analytics, fantasy basketball players, NBA analysts, and fans who want to compare players and understand trends.

## Design Philosophy

The interface should feel premium, modern, minimal, data-focused, and professional.

**Inspiration:** Linear, Vercel, StatMuse, Apple-style simplicity.

**Avoid:** cluttered sports-website layouts, excessive color, flashy/gratuitous animation, generic dashboard templates. Motion should be purposeful (state transitions, data updates) — not decorative.

When building any chart, graph, stat tile, or visualization, load the `dataviz` skill before writing chart code — it defines the color system, chart-form heuristics, and interaction rules to keep visualizations consistent.

## Tech Stack

- **React 19 + TypeScript** — strict typing throughout, no `any`
- **Vite** — build tooling and dev server
- **React Router** — routing
- **TanStack Query** — all server state (NBA data fetching, caching, loading/error states)
- **Zustand** — lightweight client state only (favorites, UI/view preferences) — never for server data
- **React Hook Form + Zod** — forms and runtime validation, sharing inferred types between schema and components
- **Tailwind CSS + shadcn/ui** — styling and accessible component primitives (built on Radix)
- **Recharts** — trend graphs, comparison charts, sortable/visual stat displays
- **Vitest + React Testing Library** — unit/component tests
- **balldontlie API** (`balldontlie.io`) — NBA players, teams, games, and season averages. All access goes through a typed client — see Data Layer below.

Tailwind, shadcn/ui, and Recharts are not yet installed in this scaffold as of the last CLAUDE.md update — confirm current `package.json` before assuming they're wired up.

## Architecture

Feature-based structure. Group by domain, not by file type:

```
src/
  app/                 # root App, router config, providers (QueryClient, etc.), layout shell
  features/
    players/
      components/      # PlayerCard, PlayerStatsTable, ...
      hooks/            # usePlayer, usePlayerStats (TanStack Query hooks)
      types.ts
    teams/
    compare/
    standings/
    favorites/
  components/
    ui/                # shadcn/ui primitives (button, dialog, tooltip, ...)
    layout/            # shared shell pieces (nav, header, page containers)
  lib/
    api/               # balldontlie API client + typed request/response helpers
    queryClient.ts
    utils.ts
  hooks/               # cross-feature hooks (useDebounce, useMediaQuery, ...)
  store/               # zustand stores (favorites, ui preferences)
  types/               # shared/global types
```

A feature should be self-contained: its components, hooks, and types live together. Only promote something to `src/components` or `src/hooks` once a second feature needs it — don't pre-abstract.

## Core Features

**Player Exploration** — search players, view profiles, career stats, game logs, advanced metrics, compare across seasons.

**Player Comparison** — compare two (or more) players side-by-side: statistical differences, trend lines over time, advanced metrics.

**Team Analytics** — rosters, team statistics, standings, recent performance/form.

**Data Visualization** — interactive charts, trend graphs, comparison visualizations, sortable tables, performance summaries. Use the `dataviz` skill for any new chart work.

## Data Layer Conventions

- The balldontlie API key lives in `VITE_BALLDONTLIE_API_KEY` (see `.env.example`; real value goes in `.env.local`, which is gitignored — never commit it). Because this is a client-only app with no backend, Vite inlines this value into the shipped JS bundle, so it's visible to anyone inspecting network requests or devtools. That's an acceptable tradeoff for a portfolio/demo project; if this ever needs to be a real production deployment, route requests through a small backend/serverless proxy instead so the key stays server-side.
- All network calls go through a single typed client in `src/lib/api` — no ad-hoc `fetch` calls scattered in components.
- One TanStack Query hook per resource/query shape (e.g. `usePlayer(id)`, `usePlayerStats(id, season)`, `useTeams()`), colocated in the owning feature's `hooks/` folder.
- Query keys are structured and centralized (e.g. `['players', id]`) so invalidation stays predictable as features grow.
- Design for the free-tier rate limits of the balldontlie API: lean on TanStack Query's caching/`staleTime` rather than refetching aggressively, and handle loading/error/empty states explicitly in the UI — never let a slow or failed request produce a blank screen.
- Zod schemas validate API responses at the boundary where it matters (avoid over-validating every field of every payload).

## Engineering Principles

**Prioritize:**
- Strong TypeScript usage — infer from Zod schemas where possible, avoid duplicated type definitions
- Reusable components built on shadcn/ui primitives, not one-off duplicated UI
- Feature-based architecture with clear separation of concerns
- Accessible UI (semantic HTML, keyboard navigation, ARIA where primitives need it — shadcn/Radix gets most of this for free)
- Responsive layouts (mobile through desktop; this is a dashboard-style app, so plan table/chart behavior on small screens deliberately)
- Performant rendering (memoization where it matters, virtualization for long lists/tables, avoid unnecessary re-renders in chart-heavy views)
- Clean, minimal state management (server state in TanStack Query, client state in Zustand — don't blur the two)

**Avoid:**
- Large monolithic components — split by responsibility
- Duplicated logic across features — extract only once reuse is real
- Weak typing (`any`, untyped API responses)
- Unnecessary complexity / speculative abstraction for hypothetical future requirements
- Half-finished implementations

## Commands

```
npm run dev       # start Vite dev server
npm run build     # typecheck (tsc -b) + production build
npm run lint      # eslint
npm run test      # vitest
```

Note: `test` is not yet defined in `package.json` even though Vitest and Testing Library are installed as devDependencies — add `"test": "vitest"` to scripts when test setup begins.
