import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartLegendContent, type ChartLegendItem } from "@/components/common/chart/chart-legend"

export interface ChartContainerProps {
  title: string
  description?: string
  legend?: ChartLegendItem[]
  /** Plot height in px — includes the x-axis band so the card never nests a scrollbar. */
  height?: number
  footer?: ReactNode
  className?: string
  children: ReactNode
}

export function ChartContainer({
  title,
  description,
  legend,
  height = 280,
  footer,
  className,
  children,
}: ChartContainerProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {legend ? <ChartLegendContent items={legend} /> : null}
      </CardHeader>
      <CardContent style={{ height }}>{children}</CardContent>
      {footer ? (
        <div className="border-t border-border px-4 pt-3 text-xs text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  )
}
