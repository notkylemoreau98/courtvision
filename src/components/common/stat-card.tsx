import type { LucideIcon } from "lucide-react"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  delta?: number
  deltaLabel?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  deltaLabel,
  className,
}: StatCardProps) {
  const trend = delta === undefined || delta === 0 ? "flat" : delta > 0 ? "up" : "down"
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus

  return (
    <Card className={cn("gap-3", className)}>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight">
          {value}
        </span>
        {delta !== undefined ? (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "flat" && "text-muted-foreground"
            )}
          >
            <TrendIcon className="size-3" />
            {Math.abs(delta)}
            {deltaLabel ? (
              <span className="text-muted-foreground">{deltaLabel}</span>
            ) : null}
          </span>
        ) : null}
      </CardContent>
    </Card>
  )
}
