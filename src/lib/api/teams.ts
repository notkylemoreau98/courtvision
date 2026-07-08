import { apiFetch } from "@/lib/api/client"
import type { ListResponse, SingleResponse, Team } from "@/lib/api/types"

export interface TeamsParams {
  conference?: string
  division?: string
}

export function getTeams(params: TeamsParams = {}) {
  return apiFetch<ListResponse<Team>>("/teams", params)
}

export function getTeam(id: number) {
  return apiFetch<SingleResponse<Team>>(`/teams/${id}`)
}
