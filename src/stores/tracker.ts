import { defineStore } from "pinia";
import {
  historyData,
  HistoryMap,
  PlaylistMap,
  trackerData,
} from "../api/relay";
import { CareerStats, Playlist, SeasonRewardData, User } from "./types";

export interface State {
  userData: User | null;
  currentSeason: number;
  seasonRewardData: SeasonRewardData;
  playlists: Playlist[];
  stats: CareerStats | null;
  playlistMap: PlaylistMap | null;
  historyMap: HistoryMap | null;
}

export const useTrackerStore = defineStore("tracker", {
  state: (): State => ({
    userData: null,
    currentSeason: 0,
    playlists: [],
    stats: null,
    seasonRewardData: {
      seasonRewardLevel: {
        rankName: "None",
        iconUrl: "",
      },
      seasonRewardWins: 0,
    },
    playlistMap: null,
    historyMap: null,
  }),
  actions: {
    async getTrackerData(platformId: string) {
      const data = await trackerData(platformId);
      this.$patch({ ...data });
    },
    async getHistoryData(playerId: number) {
      const historyMap = await historyData(playerId);
      this.$patch({ historyMap });
    },
  },
});
