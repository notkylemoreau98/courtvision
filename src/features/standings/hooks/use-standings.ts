import { useQuery } from "@tanstack/react-query"

import { getStandings } from "@/lib/api/standings"
import { queryKeys } from "@/lib/api/query-keys"

/**
 * Requires balldontlie's ALL-STAR tier — on a free-tier key this resolves
 * to an `ApiError` with `isForbidden: true`; render that as an upgrade
 * prompt rather than a generic error.
 */
export function useStandings(season: number) {
  return useQuery({
    queryKey: queryKeys.standings.list(season),
    queryFn: () => getStandings({ season }),
  })
}
