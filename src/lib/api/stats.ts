import { apiFetch } from "@/lib/api/client"
import type { PaginatedResponse, PlayerStat } from "@/lib/api/types"

/**
 * Per-game box score lines — the source for player game logs.
 * Requires balldontlie's ALL-STAR tier or above; a free-tier key gets a
 * 401 `ApiError` here (verified against the live API — see `errors.ts`).
 */
export interface StatsParams {
  cursor?: number
  per_page?: number
  player_ids?: number[]
  game_ids?: number[]
  seasons?: number[]
  postseason?: boolean
  start_date?: string
  end_date?: string
}

export function getStats(params: StatsParams = {}) {
  return apiFetch<PaginatedResponse<PlayerStat>>("/stats", params)
}
