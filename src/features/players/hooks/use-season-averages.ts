import { useQuery } from "@tanstack/react-query"

import { getSeasonAverages, type SeasonAveragesParams } from "@/lib/api/season-averages"
import { queryKeys } from "@/lib/api/query-keys"

/**
 * Season-level per-game averages. Requires balldontlie's ALL-STAR tier —
 * on a free-tier key this resolves to an `ApiError` with `isForbidden: true`;
 * render that as an upgrade prompt rather than a generic error.
 */
export function useSeasonAverages(category: string, params: SeasonAveragesParams) {
  return useQuery({
    queryKey: queryKeys.seasonAverages.list(category, params),
    queryFn: () => getSeasonAverages(category, params),
    enabled: Boolean(params.player_ids?.length),
  })
}
