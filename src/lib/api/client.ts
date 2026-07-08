import { ApiError, parseErrorMessage } from "@/lib/api/errors"

const API_BASE_URL = "https://api.balldontlie.io/v1"

export type QueryParamValue = string | number | boolean | (string | number)[] | undefined

export type QueryParams = Record<string, QueryParamValue>

/**
 * Each endpoint module declares its own narrow `*Params` interface (named,
 * optional properties, no index signature) — accepting `object` here rather
 * than `QueryParams` lets every one of those pass straight through with no
 * cast at the call site. The single assertion needed to iterate the values
 * is contained right here, where we control the runtime behavior.
 */
function buildQueryString(params?: object): string {
  if (!params) return ""

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params as QueryParams)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const item of value) search.append(`${key}[]`, String(item))
    } else {
      search.append(key, String(value))
    }
  }

  const queryString = search.toString()
  return queryString ? `?${queryString}` : ""
}

/**
 * Typed fetch wrapper for the balldontlie API. Throws `ApiError` on any
 * non-2xx response (including network-adjacent failures surfaced by fetch
 * as a rejected response), so callers — and TanStack Query's retry logic —
 * can branch on `error.status` instead of parsing strings.
 */
export async function apiFetch<T>(path: string, params?: object): Promise<T> {
  const apiKey = import.meta.env.VITE_BALLDONTLIE_API_KEY

  const response = await fetch(`${API_BASE_URL}${path}${buildQueryString(params)}`, {
    headers: { Authorization: apiKey },
  })

  if (!response.ok) {
    throw new ApiError(await parseErrorMessage(response), response.status)
  }

  return response.json() as Promise<T>
}
