import { useQuery } from "@tanstack/react-query"

import { getPlayers, type PlayersParams } from "@/lib/api/players"
import { queryKeys } from "@/lib/api/query-keys"

export function usePlayers(params: PlayersParams = {}) {
  return useQuery({
    queryKey: queryKeys.players.list(params),
    queryFn: () => getPlayers(params),
  })
}
