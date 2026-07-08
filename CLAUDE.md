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
- **Tailwind CSS v4 + shadcn/ui** — styling and accessible component primitives. shadcn now generates components on **Base UI** (`@base-ui/react`), not Radix — components use its `render` prop for composition (e.g. `<Button render={<Link to="/x" />}>`), not `asChild`/`Slot`.
- **Recharts** — trend graphs, comparison charts, sortable/visual stat displays, wrapped in the shared `ChartContainer`/`ChartTooltipContent` chrome in `src/components/common/chart/`
- **TanStack Table** (`@tanstack/react-table`) — sortable data tables, via the shared `DataTable` component
- **lucide-react** — icon set, used throughout nav, stat cards, and empty states
- **Vitest + React Testing Library** — unit/component tests
- **balldontlie API** (`balldontlie.io`) — NBA players, teams, games, and season averages. All access goes through a typed client in `src/lib/api` — see Data Layer below. **The current API key is on the free tier**: `/teams`, `/players`, and `/games` work; `/stats`, `/season_averages`, and `/standings` return a 401 `ApiError` until the key is upgraded (verified against the live API, not assumed from docs).

The design system (Tailwind theme, shadcn primitives, and the common/layout components) was built in Phase 2 — see the `/design-system` route for a live, browsable reference of every reusable piece in both light and dark mode. The typed API layer (client, hooks, error handling) was built in Phase 3 — see `/teams` for a real page wired end-to-end to live data as a reference for the pattern.

## Architecture

Feature-based structure. Group by domain, not by file type:

```
src/
  app/
    App.tsx            # provider tree + RouterProvider
    router.tsx          # route definitions
    providers.tsx        # QueryClientProvider, TooltipProvider, theme sync
    routes/              # top-level route components: HomePage, DesignSystemPage,
                         #   TeamsPage (real page, live data), ComingSoonPage (players/compare/standings/favorites placeholder)
  features/
    players/
      hooks/             # usePlayers, usePlayer, usePlayerStats, useSeasonAverages
                         #   (components/ + types.ts land in Phase 4 — no player UI yet)
    teams/
      hooks/             # useTeams, useTeam, useGames
    standings/
      hooks/             # useStandings
    compare/             # empty — Phase 4
    favorites/           # empty — Phase 4
  components/
    ui/                 # shadcn/ui primitives (button, card, table, skeleton, badge, tabs, tooltip, sidebar, ...)
    layout/             # app shell: app-shell, app-sidebar, header, logo, theme-toggle, nav-items
    common/             # cross-feature reusable pieces built on top of ui/ — the design system's composed layer:
                         #   stat-card, empty-state, data-table (sortable), loading-skeletons,
                         #   chart/ (chart-container, chart-tooltip, chart-legend, chart-colors)
  lib/
    api/               # typed balldontlie client:
                       #   client.ts (fetch wrapper), errors.ts (ApiError + response parsing),
                       #   types.ts (Team, Player, Game, PlayerStat, SeasonAverage, Standing),
                       #   query-keys.ts (centralized queryKeys factory),
                       #   teams.ts / players.ts / games.ts / stats.ts / season-averages.ts / standings.ts,
                       #   index.ts (barrel — everything except client.ts, which endpoint modules alone call)
    queryClient.ts
    utils.ts
  hooks/               # cross-feature hooks (use-mobile, ...)
  store/               # zustand stores — theme-store exists; favorites/ui-prefs land with their features
  types/               # shared/global types (non-API — API resource types live in lib/api/types.ts)
```

`components.json` at the repo root is shadcn's own CLI config (registry style, aliases) — don't hand-edit component files it manages without expecting `shadcn add` to potentially regenerate them.

A feature should be self-contained: its components, hooks, and types live together. Only promote something to `src/components` or `src/hooks` once a second feature needs it — don't pre-abstract. Before building a new card/table/empty-state/loading-state one-off inside a feature, check `src/components/common` first — that's exactly what it's there to prevent.

## Core Features

**Player Exploration** — search players, view profiles, career stats, game logs, advanced metrics, compare across seasons.

**Player Comparison** — compare two (or more) players side-by-side: statistical differences, trend lines over time, advanced metrics.

**Team Analytics** — rosters, team statistics, standings, recent performance/form.

**Data Visualization** — interactive charts, trend graphs, comparison visualizations, sortable tables, performance summaries. Use the `dataviz` skill for any new chart work.

## Data Layer Conventions

- The balldontlie API key lives in `VITE_BALLDONTLIE_API_KEY` (see `.env.example`; real value goes in `.env.local`, which is gitignored — never commit it; typed via `src/vite-env.d.ts`). Because this is a client-only app with no backend, Vite inlines this value into the shipped JS bundle, so it's visible to anyone inspecting network requests or devtools. That's an acceptable tradeoff for a portfolio/demo project; if this ever needs to be a real production deployment, route requests through a small backend/serverless proxy instead so the key stays server-side.
- All network calls go through `apiFetch` in `src/lib/api/client.ts` via the per-resource endpoint modules (`teams.ts`, `players.ts`, etc.) — no ad-hoc `fetch` calls scattered in components. Non-2xx responses throw a typed `ApiError` (from `errors.ts`) carrying the HTTP status and an `isForbidden`/`isNotFound` helper; it normalizes the three different error-body shapes the API actually returns (plain text, `{message}`, `{errors: [{param, error}]}`).
- **The current API key is free-tier: `/stats`, `/season_averages`, and `/standings` 401.** Any hook built on those (`usePlayerStats`, `useSeasonAverages`, `useStandings`) will resolve to an `ApiError` with `isForbidden: true` on this key — treat that as an "upgrade required" UI state, not a bug to chase. `/teams`, `/players`, `/games` are unrestricted.
- One TanStack Query hook per resource/query shape (e.g. `usePlayer(id)`, `useTeams()`, `useGames(params)`), colocated in the owning feature's `hooks/` folder — see `src/features/{players,teams,standings}/hooks/`.
- Query keys come from the centralized `queryKeys` factory in `src/lib/api/query-keys.ts` (e.g. `queryKeys.players.detail(id)` → `['players', 'detail', id]`) — don't hand-write query key arrays, and extend the factory when a new resource needs one.
- `queryClient`'s default `retry` (in `src/lib/queryClient.ts`) already skips retrying 4xx `ApiError`s and only retries transient failures — don't re-implement retry logic per-hook.
- Handle loading/error/empty states explicitly in the UI (see `TeamsPage` in `src/app/routes/teams.tsx` for the reference pattern: `TableSkeleton` while loading, `EmptyState` + retry button on error, distinguishing the free-tier 403/401 message from a generic failure) — never let a slow or failed request produce a blank screen.
- **Not yet implemented:** Zod validation of API responses at the boundary. Phase 3 typed responses directly from the verified live API shape (no runtime validation) — add Zod schemas if/when the API proves unreliable enough to warrant it, rather than validating everything preemptively.

## Engineering Principles

**Prioritize:**
- Strong TypeScript usage — infer from Zod schemas where possible, avoid duplicated type definitions
- Reusable components built on shadcn/ui primitives, not one-off duplicated UI
- Feature-based architecture with clear separation of concerns
- Accessible UI (semantic HTML, keyboard navigation, ARIA where primitives need it — shadcn/Base UI gets most of this for free)
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

