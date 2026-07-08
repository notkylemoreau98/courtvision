import { apiFetch } from "@/lib/api/client"
import type { PaginatedResponse, SeasonAverage } from "@/lib/api/types"

/**
 * Season-level per-game averages, grouped into categories such as
 * `general/base` (pts/reb/ast per game) or `general/advanced`.
 * Requires balldontlie's ALL-STAR tier or above; a free-tier key gets a
 * 401 `ApiError` here (verified against the live API — see `errors.ts`).
 */
export interface SeasonAveragesParams {
  season: number
  season_type?: "regular" | "playoffs" | "ist" | "playin"
  type?: string
  player_ids?: number[]
  cursor?: number
  per_page?: number
}

export function getSeasonAverages(category: string, params: SeasonAveragesParams) {
  return apiFetch<PaginatedResponse<SeasonAverage>>(`/season_averages/${category}`, params)
}
