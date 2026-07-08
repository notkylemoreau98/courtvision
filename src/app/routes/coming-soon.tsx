import { Construction } from "lucide-react"

import { AppShell } from "@/components/layout/app-shell"
import { EmptyState } from "@/components/common/empty-state"

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <AppShell title={title}>
      <EmptyState
        icon={Construction}
        title={`${title} is coming in a later phase`}
        description="The design system is in place — this view will be built once the data layer lands."
      />
    </AppShell>
  )
}
