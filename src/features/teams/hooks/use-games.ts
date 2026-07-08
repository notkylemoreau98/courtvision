import { useQuery } from "@tanstack/react-query"

import { getGames, type GamesParams } from "@/lib/api/games"
import { queryKeys } from "@/lib/api/query-keys"

/** Team schedule / recent results. Works on the free tier. */
export function useGames(params: GamesParams = {}) {
  return useQuery({
    queryKey: queryKeys.games.list(params),
    queryFn: () => getGames(params),
  })
}
