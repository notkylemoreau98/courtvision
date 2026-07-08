import { useQuery } from "@tanstack/react-query"

import { getTeams, type TeamsParams } from "@/lib/api/teams"
import { queryKeys } from "@/lib/api/query-keys"

export function useTeams(params: TeamsParams = {}) {
  return useQuery({
    queryKey: queryKeys.teams.list(params),
    queryFn: () => getTeams(params),
    staleTime: 60 * 60 * 1000, // the 30-team list changes essentially never
  })
}
