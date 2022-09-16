<script lang="ts" setup>
import { computed } from "vue";
import { Playlist } from "../stores/types";

const { playlist } = defineProps<{ playlist: Playlist }>();
console.debug(playlist.tier, playlist.rating);
const percentile = computed(() =>
  playlist.rating.percentile < 50
    ? `Bottom ${playlist.rating.percentile} %`
    : `Top ${(100 - playlist.rating.percentile).toFixed(1)} %`
);
const percentileColor = computed(
  () =>
    `rgb(${(255 * (100 - playlist.rating.percentile)) / 100}, ${
      (255 * playlist.rating.percentile) / 100
    }, 0)`
);
</script>

<template>
  <div class="card">
    <img :src="playlist.tier.iconUrl" :alt="playlist.tier.name" />
    <span>
      <div>{{ playlist.playlistName }}</div>
      <div>
        {{ playlist.division.name }}
        <span class="percentile">({{ percentile }})</span>
      </div>
    </span>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  white-space: nowrap;
}
.percentile {
  font-size: smaller;
  opacity: 80%;
  color: v-bind(percentileColor);
}
@media (prefers-color-scheme: light) {
  .percentile {
    filter: brightness(50%);
  }
}
img {
  width: 56px;
}
</style>
