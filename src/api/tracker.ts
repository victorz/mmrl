export interface UserProfile {
  platformInfo: PlatformInfo;
  userInfo: UserInfo;
  metadata: Metadata;
  segments: (OverviewSegment | PlaylistSegment)[];
  availableSegments: AvailableSeason[]; // the available seasons for which there is (may be?) data.
}

interface PlatformInfo {
  platformSlug: string;
  platformUserId: string | null;
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

interface Metadata {
  lastUpdated: {
    value: string; // string parseable as date
    displayValue: string;
  };
  playerId: number;
  currentSeason: number;
}

interface Segment {
  type: "overview" | "playlist";
  metadata: { name: string };
}

type NumberValue = {
  value: number;
  displayName: string;
  displayType: "Number" | "String";
};

interface OverviewSegment extends Segment {
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

interface PlaylistSegment {
  type: "playlist";
  attributes: { playlistId: number; season: number };
  stats: {
    tier: NumberValue & {
      metadata: {
        iconUrl: string;
        name: string;
      };
    };
    division: NumberValue & {
      metadata: {
        name: string;
      };
    };
    matchesPlayed: NumberValue;
    winStreak: NumberValue & {
      metadata: { type: "win" };
    };
    rating: NumberValue;
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
