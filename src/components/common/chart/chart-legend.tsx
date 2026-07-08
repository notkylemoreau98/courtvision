export interface ChartLegendItem {
  label: string
  color: string
}

export function ChartLegendContent({ items }: { items: ChartLegendItem[] }) {
  if (items.length < 2) return null

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="h-[2px] w-3 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </div>
      ))}
    </div>
  )
}
