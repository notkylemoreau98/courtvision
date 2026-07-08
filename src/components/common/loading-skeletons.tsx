import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatCardSkeleton() {
  return (
    <Card className="gap-3">
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="size-4 rounded-full" />
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-4 w-10" />
      </CardContent>
    </Card>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  )
}

export function TableSkeleton({
  rows = 6,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <div className="flex border-b border-border bg-muted/50 px-4 py-2.5">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="mr-6 h-3 w-20 last:mr-0" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex items-center px-4 py-3">
            {Array.from({ length: columns }).map((_, col) => (
              <Skeleton
                key={col}
                className="mr-6 h-3 w-16 last:mr-0"
                style={{ width: col === 0 ? "8rem" : undefined }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="flex h-56 items-end gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-1"
              style={{ height: `${30 + ((i * 37) % 70)}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
