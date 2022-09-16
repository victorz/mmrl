<script setup lang="ts">
import { difference } from "ramda";
import { computed } from "vue";
import { useTrackerStore } from "../stores/tracker";
import { Playlist } from "../stores/types";
import PlaylistCard from "./PlaylistCard.vue";

const props = defineProps<{ profileId: string }>();
const tracker = useTrackerStore();
// TODO: Move this to the App component, perhaps. Or main? Not sure how to use
// the Suspense component with that.
await tracker.getTrackerData(props.profileId);
await tracker.getHistoryData(tracker.userData?.playerId ?? 0);

const unranked = computed(
  (): Playlist => tracker.playlists.find((p) => p.playlistName === "Un-Ranked")!
);
const ranked = computed((): Playlist[] =>
  tracker.playlists.filter((p) => p.playlistName.includes("Ranked "))
);
const tournaments = computed(
  (): Playlist =>
    tracker.playlists.find((p) => p.playlistName.includes("Tournament"))!
);
const extra = computed(() =>
  difference(tracker.playlists, [
    unranked.value,
    tournaments.value,
    ...ranked.value,
  ])
);
</script>

<template>
  <div class="ranks">
    <section>
      <PlaylistCard v-for="playlist in ranked" :playlist="playlist" />
    </section>
    <section>
      <PlaylistCard v-for="playlist in extra" :playlist="playlist" />
    </section>
    <section>
      <PlaylistCard :playlist="unranked" />
      <PlaylistCard :playlist="tournaments" />
    </section>
    <!-- TODO: add season reward level here, with number of wins and icon and stuff -->
  </div>
</template>

<style scoped>
.ranks {
  padding-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
