import { apiFetch } from "@/lib/api/client"
import type { PaginatedResponse, Player, SingleResponse } from "@/lib/api/types"

export interface PlayersParams {
  cursor?: number
  per_page?: number
  search?: string
  team_ids?: number[]
}

export function getPlayers(params: PlayersParams = {}) {
  return apiFetch<PaginatedResponse<Player>>("/players", params)
}

export function getPlayer(id: number) {
  return apiFetch<SingleResponse<Player>>(`/players/${id}`)
}
