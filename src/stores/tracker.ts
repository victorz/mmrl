import { defineStore } from "pinia";
import { trackerData } from "../api/relay";
import { CareerStats, Playlist, SeasonRewardData, User } from "./types";

export interface State {
  userData?: User;
  seasonRewardData?: SeasonRewardData;
  playlists?: Playlist[];
  currentSeason?: number;
  stats?: CareerStats;
}

export const useTrackerStore = defineStore("tracker", {
  state: (): State => ({}),
  actions: {
    async getTrackerData(platformId: string) {
      const data = await trackerData(platformId);
      this.$patch({ ...data });
    },
  },
});
