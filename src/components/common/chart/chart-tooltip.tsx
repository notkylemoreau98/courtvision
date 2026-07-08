interface TooltipPayloadItem {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
}

interface ChartTooltipContentProps {
  active?: boolean
  label?: string | number
  payload?: TooltipPayloadItem[]
  formatValue?: (value: number | string, key: string | number | undefined) => string
}

export function ChartTooltipContent({
  active,
  label,
  payload,
  formatValue,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="min-w-36 rounded-lg border border-border bg-popover p-2.5 shadow-md">
      {label !== undefined ? (
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="space-y-1">
        {payload.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span
                className="h-[2px] w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {formatValue && item.value !== undefined
                ? formatValue(item.value, item.dataKey)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
