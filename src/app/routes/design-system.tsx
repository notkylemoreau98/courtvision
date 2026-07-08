import { useState, type ReactNode } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { ColumnDef } from "@tanstack/react-table"
import { Star, TrendingUp, Users, Percent, Search } from "lucide-react"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { StatCard } from "@/components/common/stat-card"
import { EmptyState } from "@/components/common/empty-state"
import { DataTable } from "@/components/common/data-table"
import {
  StatCardSkeleton,
  CardSkeleton,
  TableSkeleton,
  ChartSkeleton,
} from "@/components/common/loading-skeletons"
import { ChartContainer } from "@/components/common/chart/chart-container"
import { ChartTooltipContent } from "@/components/common/chart/chart-tooltip"
import { CHART_COLORS, CHART_GRID_COLOR, CHART_AXIS_COLOR } from "@/components/common/chart/chart-colors"

type DemoState = "data" | "loading" | "empty"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-1.5">
      <div className={`h-12 w-full rounded-lg ring-1 ring-foreground/10 ${className}`} />
      <p className="text-xs text-muted-foreground">{name}</p>
    </div>
  )
}

interface PlayerRow {
  player: string
  team: string
  pts: number
  reb: number
  ast: number
  fg: string
}

const playerRows: PlayerRow[] = [
  { player: "J. Tatum", team: "BOS", pts: 27.1, reb: 8.1, ast: 4.6, fg: "47.1%" },
  { player: "L. Doncic", team: "DAL", pts: 32.4, reb: 8.6, ast: 9.1, fg: "48.7%" },
  { player: "N. Jokic", team: "DEN", pts: 26.4, reb: 12.4, ast: 9.0, fg: "58.3%" },
  { player: "S. Gilgeous-Alexander", team: "OKC", pts: 30.1, reb: 5.5, ast: 6.2, fg: "53.5%" },
  { player: "G. Antetokounmpo", team: "MIL", pts: 30.8, reb: 11.5, ast: 6.5, fg: "61.1%" },
]

const playerColumns: ColumnDef<PlayerRow>[] = [
  { accessorKey: "player", header: "Player" },
  { accessorKey: "team", header: "Team" },
  { accessorKey: "pts", header: "PTS" },
  { accessorKey: "reb", header: "REB" },
  { accessorKey: "ast", header: "AST" },
  { accessorKey: "fg", header: "FG%" },
]

const trendData = [
  { game: "G1", teamA: 24, teamB: 19 },
  { game: "G2", teamA: 27, teamB: 22 },
  { game: "G3", teamA: 22, teamB: 26 },
  { game: "G4", teamA: 30, teamB: 25 },
  { game: "G5", teamA: 28, teamB: 29 },
  { game: "G6", teamA: 33, teamB: 27 },
]

export function DesignSystemPage() {
  const [state, setState] = useState<DemoState>("data")

  return (
    <AppShell title="Design system">
      <div className="mb-2 flex items-center justify-between">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The reusable UI foundation for CourtVision — colors, typography, and
          composed components. Toggle the state below to preview loading and
          empty variants of the data-bound pieces.
        </p>
        <Tabs value={state} onValueChange={(v) => setState(v as DemoState)}>
          <TabsList>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="loading">Loading</TabsTrigger>
            <TabsTrigger value="empty">Empty</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Section title="Color" description="Semantic tokens driven by the CourtVision data-viz palette.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <Swatch name="background" className="bg-background" />
          <Swatch name="card" className="bg-card" />
          <Swatch name="primary" className="bg-primary" />
          <Swatch name="secondary" className="bg-secondary" />
          <Swatch name="muted" className="bg-muted" />
          <Swatch name="accent" className="bg-accent" />
          <Swatch name="success" className="bg-success" />
          <Swatch name="warning" className="bg-warning" />
          <Swatch name="destructive" className="bg-destructive" />
          <Swatch name="chart-1" className="bg-chart-1" />
          <Swatch name="chart-2" className="bg-chart-2" />
          <Swatch name="chart-3" className="bg-chart-3" />
          <Swatch name="chart-4" className="bg-chart-4" />
          <Swatch name="chart-5" className="bg-chart-5" />
        </div>
      </Section>

      <Section title="Typography">
        <Card>
          <CardContent className="space-y-3 pt-0">
            <p className="text-2xl font-semibold tracking-tight">
              Heading — 2xl semibold
            </p>
            <p className="text-lg font-semibold tracking-tight">
              Heading — lg semibold
            </p>
            <p className="text-sm">Body — sm regular, the default UI size.</p>
            <p className="text-sm text-muted-foreground">
              Muted — secondary/help text.
            </p>
            <p className="text-sm tabular-nums">
              Tabular figures for columns: 1,284 · 12.9 · 58.3%
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Buttons">
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 pt-0">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="icon" aria-label="Search">
              <Search />
            </Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>
      </Section>

      <Section title="Badges">
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 pt-0">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </CardContent>
        </Card>
      </Section>

      <Section title="Stat cards" description="Reused across player, team, and standings summaries.">
        {state === "loading" ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Points per game" value="27.4" icon={TrendingUp} delta={4.2} deltaLabel="vs last season" />
            <StatCard label="Assists per game" value="6.1" icon={Users} delta={-1.1} deltaLabel="vs last season" />
            <StatCard label="Field goal %" value="49.6%" icon={Percent} delta={0} deltaLabel="unchanged" />
            <StatCard label="Favorited by" value="12.3K" icon={Star} />
          </div>
        )}
      </Section>

      <Section title="Cards">
        {state === "loading" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Season summary</CardTitle>
                <CardDescription>2025–26 regular season, through 41 games</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A generic content card — the base building block every composed
                card (stat card, chart container, player card) sits on top of.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
                <CardDescription>Composed from Input + Button primitives</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Input placeholder="Search players…" />
                <Button>Search</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </Section>

      <Section title="Data table" description="Sortable, with built-in loading and empty states.">
        {state === "loading" ? (
          <TableSkeleton columns={playerColumns.length} />
        ) : state === "empty" ? (
          <EmptyState title="No players found" description="Try adjusting your filters or search query." />
        ) : (
          <DataTable columns={playerColumns} data={playerRows} />
        )}
      </Section>

      <Section title="Chart container" description="Recharts wrapped in consistent chrome, per the data-viz palette.">
        {state === "loading" ? (
          <ChartSkeleton />
        ) : state === "empty" ? (
          <EmptyState title="No trend data" description="This player hasn't logged minutes in the selected range." />
        ) : (
          <ChartContainer
            title="Points per game"
            description="Last 6 games"
            legend={[
              { label: "Team A", color: CHART_COLORS[0] },
              { label: "Team B", color: CHART_COLORS[1] },
            ]}
            height={260}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART_GRID_COLOR} />
                <XAxis
                  dataKey="game"
                  stroke={CHART_AXIS_COLOR}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis
                  stroke={CHART_AXIS_COLOR}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  width={32}
                />
                <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: CHART_GRID_COLOR }} />
                <Line
                  type="monotone"
                  dataKey="teamA"
                  name="Team A"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
                />
                <Line
                  type="monotone"
                  dataKey="teamB"
                  name="Team B"
                  stroke={CHART_COLORS[1]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Section>

      <Section title="Empty state">
        <EmptyState
          icon={Star}
          title="No favorites yet"
          description="Star a player or team to pin them here for quick access."
          action={<Button size="sm">Browse players</Button>}
        />
      </Section>
    </AppShell>
  )
}
