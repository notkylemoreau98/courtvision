import { Link } from "react-router"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HomePage() {
  return (
    <AppShell title="Overview">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to CourtVision</CardTitle>
          <CardDescription>
            The design system foundation is in place. Player, team, and
            comparison views land in the next phase once the data layer is
            wired up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button nativeButton={false} render={<Link to="/design-system" />}>
            View the design system
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  )
}
