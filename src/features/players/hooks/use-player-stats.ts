import { useQuery } from "@tanstack/react-query"

import { getStats, type StatsParams } from "@/lib/api/stats"
import { queryKeys } from "@/lib/api/query-keys"

/**
 * Player game log (box score rows). Requires balldontlie's ALL-STAR tier —
 * on a free-tier key this resolves to an `ApiError` with `isForbidden: true`;
 * render that as an upgrade prompt rather than a generic error.
 */
export function usePlayerStats(params: StatsParams) {
  return useQuery({
    queryKey: queryKeys.stats.list(params),
    queryFn: () => getStats(params),
    enabled: Boolean(params.player_ids?.length),
  })
}
