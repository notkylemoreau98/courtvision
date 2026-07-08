import { useEffect, type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/queryClient"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useThemeStore } from "@/store/theme-store"

function ThemeSync() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return null
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delay={200}>
        <ThemeSync />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
