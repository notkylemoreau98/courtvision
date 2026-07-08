import { useQuery } from "@tanstack/react-query"

import { getTeam } from "@/lib/api/teams"
import { queryKeys } from "@/lib/api/query-keys"

export function useTeam(id: number | undefined) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id ?? -1),
    queryFn: () => getTeam(id as number),
    enabled: id !== undefined,
    staleTime: 60 * 60 * 1000,
  })
}
