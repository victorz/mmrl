export interface User {
  playerId: number; // used to query MMR history
  platformId: string;
  lastUpdated: Date;
  avatarUrl: string;
}

export interface CareerStats {
  wins: number;
  goals: number;
  mvps: number;
  saves: number;
  assists: number;
  shots: number;
  goalShotRatio: number;
}

export interface SeasonRewardData {
  seasonRewardWins: number;
  seasonRewardLevel: {
    rankName: string;
    iconUrl: string;
  };
}

export interface Playlist {
  playlistId: number;
  playlistName: string;
  season: number;
  rating: {
    value: number;
    percentile: number;
  };
  tier: {
    value: number;
    name: string;
    iconUrl: string;
    percentile: number;
  };
  division: {
    name: string;
    value: number;
    percentile: number;
    deltaUp: number;
    deltaDown: number;
  };
  /**
   * winStreak is negative if loss streak.
   */
  winStreak: number;
  matchesPlayed: number;
}
