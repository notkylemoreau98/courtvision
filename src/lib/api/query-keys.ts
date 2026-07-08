import type { GamesParams } from "@/lib/api/games"
import type { PlayersParams } from "@/lib/api/players"
import type { SeasonAveragesParams } from "@/lib/api/season-averages"
import type { StatsParams } from "@/lib/api/stats"
import type { TeamsParams } from "@/lib/api/teams"

/**
 * Centralized, structured query keys — one source of truth so invalidation
 * (`queryClient.invalidateQueries({ queryKey: queryKeys.players.all })`)
 * stays predictable as more features start reading the same resources.
 */
export const queryKeys = {
  teams: {
    all: ["teams"] as const,
    lists: () => [...queryKeys.teams.all, "list"] as const,
    list: (params: TeamsParams = {}) => [...queryKeys.teams.lists(), params] as const,
    details: () => [...queryKeys.teams.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.teams.details(), id] as const,
  },
  players: {
    all: ["players"] as const,
    lists: () => [...queryKeys.players.all, "list"] as const,
    list: (params: PlayersParams = {}) => [...queryKeys.players.lists(), params] as const,
    details: () => [...queryKeys.players.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.players.details(), id] as const,
  },
  games: {
    all: ["games"] as const,
    lists: () => [...queryKeys.games.all, "list"] as const,
    list: (params: GamesParams = {}) => [...queryKeys.games.lists(), params] as const,
    details: () => [...queryKeys.games.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.games.details(), id] as const,
  },
  stats: {
    all: ["stats"] as const,
    list: (params: StatsParams = {}) => [...queryKeys.stats.all, "list", params] as const,
  },
  seasonAverages: {
    all: ["season-averages"] as const,
    list: (category: string, params: SeasonAveragesParams) =>
      [...queryKeys.seasonAverages.all, category, params] as const,
  },
  standings: {
    all: ["standings"] as const,
    list: (season: number) => [...queryKeys.standings.all, season] as const,
  },
} as const
