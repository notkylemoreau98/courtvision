/**
 * Fixed categorical order — never cycle or reassign by rank.
 * Values reference the CSS custom properties defined in src/index.css,
 * which already carry validated light/dark steps (see dataviz skill palette).
 */
export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

export const CHART_GRID_COLOR = "var(--border)"
export const CHART_AXIS_COLOR = "var(--muted-foreground)"

export const STATUS_COLORS = {
  good: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--destructive)",
} as const
