import { apiFetch } from "@/lib/api/client"
import type { Game, PaginatedResponse, SingleResponse } from "@/lib/api/types"

export interface GamesParams {
  cursor?: number
  per_page?: number
  seasons?: number[]
  team_ids?: number[]
  dates?: string[]
  postseason?: boolean
  start_date?: string
  end_date?: string
}

export function getGames(params: GamesParams = {}) {
  return apiFetch<PaginatedResponse<Game>>("/games", params)
}

export function getGame(id: number) {
  return apiFetch<SingleResponse<Game>>(`/games/${id}`)
}
