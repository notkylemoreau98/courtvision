import { useQuery } from "@tanstack/react-query"

import { getPlayer } from "@/lib/api/players"
import { queryKeys } from "@/lib/api/query-keys"

/** Pass `undefined` while the id isn't known yet (e.g. still reading the route param) — the query stays disabled. */
export function usePlayer(id: number | undefined) {
  return useQuery({
    queryKey: queryKeys.players.detail(id ?? -1),
    queryFn: () => getPlayer(id as number),
    enabled: id !== undefined,
  })
}
