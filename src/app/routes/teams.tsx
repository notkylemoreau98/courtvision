import type { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle } from "lucide-react"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/common/empty-state"
import { DataTable } from "@/components/common/data-table"
import { TableSkeleton } from "@/components/common/loading-skeletons"
import { useTeams } from "@/features/teams/hooks/use-teams"
import { ApiError, type Team } from "@/lib/api"

const columns: ColumnDef<Team>[] = [
  { accessorKey: "full_name", header: "Team" },
  { accessorKey: "conference", header: "Conference" },
  { accessorKey: "division", header: "Division" },
  {
    accessorKey: "abbreviation",
    header: "Abbr.",
    cell: ({ row }) => <Badge variant="outline">{row.original.abbreviation}</Badge>,
  },
]

export function TeamsPage() {
  const { data, isLoading, isError, error, refetch } = useTeams()

  // balldontlie's /teams returns every franchise in NBA history — defunct
  // teams (Sheboygan Redskins, Indianapolis Olympians, ...) come back with
  // a whitespace-only conference ("    ", not ""), so `.trim()` before the
  // truthiness check; the 30 current teams always have a real conference.
  const activeTeams = data?.data.filter((team) => team.conference.trim()) ?? []

  return (
    <AppShell title="Teams">
      {isLoading ? (
        <TableSkeleton columns={columns.length} rows={8} />
      ) : isError ? (
        <EmptyState
          icon={AlertTriangle}
          title={
            error instanceof ApiError && error.isForbidden
              ? "Teams requires a different API plan"
              : "Couldn't load teams"
          }
          description={error instanceof Error ? error.message : "Something went wrong."}
          action={
            <Button size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          }
        />
      ) : (
        <DataTable columns={columns} data={activeTeams} />
      )}
    </AppShell>
  )
}
