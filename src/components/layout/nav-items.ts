import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  Shield,
  GitCompareArrows,
  Trophy,
  Star,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export const primaryNavItems: NavItem[] = [
  { title: "Overview", href: "/", icon: LayoutDashboard },
  { title: "Players", href: "/players", icon: Users },
  { title: "Teams", href: "/teams", icon: Shield },
  { title: "Compare", href: "/compare", icon: GitCompareArrows },
  { title: "Standings", href: "/standings", icon: Trophy },
  { title: "Favorites", href: "/favorites", icon: Star },
]
