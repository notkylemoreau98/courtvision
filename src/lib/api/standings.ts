import { apiFetch } from "@/lib/api/client"
import type { ListResponse, Standing } from "@/lib/api/types"

/**
 * Requires balldontlie's ALL-STAR tier or above; a free-tier key gets a
 * 401 `ApiError` here (verified against the live API — see `errors.ts`).
 */
export interface StandingsParams {
  season: number
}

export function getStandings(params: StandingsParams) {
  return apiFetch<ListResponse<Standing>>("/standings", params)
}
