import { defineStore } from "pinia";
import { trackerData } from "../api/relay";
import { CareerStats, Playlist, SeasonRewardData, User } from "./types";

export interface State {
  userData: User | null;
  currentSeason: number;
  seasonRewardData: SeasonRewardData;
  playlists: Playlist[];
  stats: CareerStats | null;
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
  }),
  actions: {
    async getTrackerData(platformId: string) {
      const data = await trackerData(platformId);
      this.$patch({ ...data });
    },
  },
});
