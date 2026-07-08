import { createBrowserRouter } from "react-router"

import { HomePage } from "@/app/routes/home"
import { DesignSystemPage } from "@/app/routes/design-system"
import { TeamsPage } from "@/app/routes/teams"
import { ComingSoonPage } from "@/app/routes/coming-soon"

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/design-system", element: <DesignSystemPage /> },
  { path: "/players", element: <ComingSoonPage title="Players" /> },
  { path: "/teams", element: <TeamsPage /> },
  { path: "/compare", element: <ComingSoonPage title="Compare" /> },
  { path: "/standings", element: <ComingSoonPage title="Standings" /> },
  { path: "/favorites", element: <ComingSoonPage title="Favorites" /> },
])
