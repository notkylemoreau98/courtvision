export interface Team {
  id: number
  conference: string
  division: string
  city: string
  name: string
  full_name: string
  abbreviation: string
}

export interface Player {
  id: number
  first_name: string
  last_name: string
  position: string
  height: string
  weight: string
  jersey_number: string
  college: string
  country: string
  draft_year: number | null
  draft_round: number | null
  draft_number: number | null
  team: Team
}

export interface Game {
  id: number
  date: string
  season: number
  status: string
  period: number
  time: string
  postseason: boolean
  postponed: boolean
  datetime: string
  home_team: Team
  home_team_score: number
  home_q1: number | null
  home_q2: number | null
  home_q3: number | null
  home_q4: number | null
  visitor_team: Team
  visitor_team_score: number
  visitor_q1: number | null
  visitor_q2: number | null
  visitor_q3: number | null
  visitor_q4: number | null
}

/**
 * Box-score line for one player in one game. Gated behind balldontlie's
 * paid tiers — see the ALL-STAR-tier note in stats.ts.
 */
export interface PlayerStat {
  id: number
  min: string
  fgm: number
  fga: number
  fg_pct: number
  fg3m: number
  fg3a: number
  fg3_pct: number
  ftm: number
  fta: number
  ft_pct: number
  oreb: number
  dreb: number
  reb: number
  ast: number
  stl: number
  blk: number
  turnover: number
  pf: number
  pts: number
  plus_minus: number
  player: Player
  team: Team
  game: Game
}

/** Gated behind balldontlie's paid tiers — see season-averages.ts. */
export interface SeasonAverage {
  player: Player
  season: number
  season_type: string
  stats: Record<string, number | string>
}

/** Gated behind balldontlie's paid tiers — see standings.ts. */
export interface Standing {
  team: Team
  conference_record: string
  conference_rank: number
  division_record: string
  division_rank: number
  wins: number
  losses: number
  home_record: string
  road_record: string
  season: number
}

export interface PaginationMeta {
  per_page: number
  /** Absent when there is no further page. */
  next_cursor?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

/** Unpaginated list endpoints (teams, standings — small, fixed-size result sets). */
export interface ListResponse<T> {
  data: T[]
}

export interface SingleResponse<T> {
  data: T
}
