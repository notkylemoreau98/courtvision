import { cn } from "@/lib/utils"

export function Logo({
  className,
  iconOnly = false,
}: {
  className?: string
  iconOnly?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="size-3.5"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 1.5V14.5M1.5 8H14.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-sm font-semibold tracking-tight">
          CourtVision
        </span>
      )}
    </div>
  )
}
