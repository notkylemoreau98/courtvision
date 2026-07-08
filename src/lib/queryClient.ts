import { QueryClient } from "@tanstack/react-query"

import { ApiError } from "@/lib/api/errors"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // 4xx errors (bad request, unauthorized, not found) won't succeed on
      // retry — only retry transient failures (network errors, 5xx).
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
    },
  },
})
