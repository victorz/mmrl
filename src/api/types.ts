// https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/76561197990565694?
export interface UserProfile {
  platformInfo: PlatformInfo;
  userInfo: UserInfo;
  metadata: {
    lastUpdated: {
      value: string; // string parseable as date
      displayValue: string;
    };
    playerId: number;
    currentSeason: number;
  };
  segments: (OverviewSegment | PlaylistSegment)[];
  availableSegments: AvailableSeason[]; // the available seasons for which there is (may be?) data.
}

// https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/76561197990565694/segments/playlist?season=22
// -> data: PlaylistSegment[]

export interface PlatformInfo {
  platformSlug: string;
  platformUserHandle: string;
  platformUserIdentifier: string;
  avatarUrl: string;
  additionalParameters: string | null;
}

interface UserInfo {
  userId: string;
  isPremium: boolean;
  isVerified: boolean;
  isInfluencer: boolean;
  isPartner: boolean;
  countryCode: string;
  pageViews: number;
  isSuspicious: boolean | null;
}

export interface Segment {
  type: "overview" | "playlist";
  metadata: {
    // "Lifetime" for "overview", playlist name for "playlist".
    name: string;
  };
}

type NumberValue = {
  value: number;
  displayName: string;
  displayType: "Number" | "String";
};

export interface OverviewSegment extends Segment {
  type: "overview";
  stats: {
    wins: NumberValue;
    goals: NumberValue;
    mVPs: NumberValue;
    saves: NumberValue;
    assists: NumberValue;
    shots: NumberValue;
    goalShotRatio: NumberValue;
    score: NumberValue;
    seasonRewardWins: NumberValue;
    seasonRewardLevel: NumberValue & {
      metadata: {
        iconUrl: string;
        rankName: string;
      };
    };
  };
}

type DivisionName = string;
export interface PlaylistSegment extends Segment {
  type: "playlist";
  attributes: { playlistId: number; season: number };
  stats: {
    tier: NumberValue & {
      percentile: number;
      metadata: {
        iconUrl: string;
        name: string;
      };
    };
    division: NumberValue & {
      percentile: number;
      metadata: {
        deltaDown: number;
        deltaUp: number;
        name: DivisionName;
      };
    };
    matchesPlayed: NumberValue;
    winStreak: NumberValue & {
      metadata: { type: "win" | "loss" };
    };
    rating: NumberValue & { percentile: number };
  };
}

interface AvailableSeason {
  type: "playlist";
  attributes: { season: number }; // the true season
  metadata: {
    // the name of the season, due to the season reboot when acquired by Epic.
    name: string;
  };
}

// /api/v1/rocket-league/distribution/:playlistId
export type PlaylistId = number;
export type PlaylistName = string;
export interface Distribution {
  tiers: string[];
  divisions: string[];
  playlists: { key: PlaylistId; value: PlaylistName }[];
  data: {
    id: number;
    tier: number;
    playlist: PlaylistId;
    players: number;
    division: number;
    minMMR: number;
    maxMMR: number;
  }[];
}

// https://api.tracker.gg/api/v1/rocket-league/player-history/mmr/:playerId?playlist=<playlistId>
export interface HistoryPoint {
  rating: number; // this is the MMR
  tier: string;
  division: string;
  tierId: number;
  divisionId: number;
  collectDate: string; // parseable as Date
}
export type DistData = Record<PlaylistId, HistoryPoint[]>;
