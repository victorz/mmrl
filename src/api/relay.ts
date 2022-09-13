import { CareerStats, Playlist, SeasonRewardData, User } from "../stores/types";
import {
  OverviewSegment,
  PlaylistSegment,
  Segment,
  UserProfile,
} from "./types";

const HOST = "http://localhost:3000";

export async function getUserData(platformId: string): Promise<UserProfile> {
  const res = await fetch(`${HOST}/profile/${platformId}`, {
    mode: "cors",
  });

  if (!res.ok) {
    throw new Error(
      `could not fetch user data: ${res.status} ${res.statusText}`
    );
  }

  return await res.json();
}

const isPlaylistSegment = (s: Segment): s is PlaylistSegment =>
  s.type === "playlist";
const isOverviewSegment = (s: Segment): s is OverviewSegment =>
  s.type === "overview";

export function transform(profile: UserProfile): {
  userData: User;
  seasonRewardData: SeasonRewardData;
  playlists: Playlist[];
  currentSeason: number;
  stats: CareerStats;
} {
  const overview = profile.segments.find(isOverviewSegment);

  const playlistNames = new Map(
    profile.segments
      .filter(isPlaylistSegment)
      .map((s) => [s.attributes.playlistId, s.metadata.name])
  );

  const playlists = profile.segments.filter(isPlaylistSegment).map(
    (s): Playlist => ({
      playlistId: s.attributes.playlistId,
      playlistName:
        playlistNames.get(s.attributes.playlistId) ?? "Unknown playlist",
      season: s.attributes.season,
      rating: {
        value: s.stats.rating.value,
        percentile: s.stats.rating.percentile,
      },
      tier: {
        value: s.stats.tier.value,
        percentile: s.stats.tier.percentile,
        name: s.stats.tier.metadata.name,
        iconUrl: s.stats.tier.metadata.iconUrl,
      },
      division: {
        percentile: s.stats.division.percentile,
        value: s.stats.division.value,
        name: s.stats.division.metadata.name,
        deltaUp: s.stats.division.metadata.deltaUp,
        deltaDown: s.stats.division.metadata.deltaDown,
      },
      matchesPlayed: s.stats.matchesPlayed.value,
      winStreak: s.stats.winStreak.value,
    })
  );

  return {
    userData: {
      playerId: profile.metadata.playerId,
      platformId: profile.platformInfo.platformUserIdentifier,
      avatarUrl: profile.platformInfo.avatarUrl,
      lastUpdated: new Date(profile.metadata.lastUpdated.value),
    },
    currentSeason: profile.metadata.currentSeason,
    playlists,
    seasonRewardData: {
      seasonRewardLevel: {
        rankName: overview?.stats.seasonRewardLevel.metadata.rankName ?? "None",
        iconUrl: overview?.stats.seasonRewardLevel.metadata.iconUrl ?? "",
      },
      seasonRewardWins: overview?.stats.seasonRewardWins.value ?? 0,
    },
    stats: {
      wins: overview?.stats.wins.value ?? 0,
      assists: overview?.stats.assists.value ?? 0,
      goals: overview?.stats.goals.value ?? 0,
      goalShotRatio: overview?.stats.goalShotRatio.value ?? 0,
      mvps: overview?.stats.mVPs.value ?? 0,
      saves: overview?.stats.saves.value ?? 0,
      shots: overview?.stats.shots.value ?? 0,
    },
  };
}

export async function trackerData(platformId: string) {
  return transform(await getUserData(platformId));
}
