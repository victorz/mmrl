<script lang="ts" setup>
import { computed } from "vue";
import { Playlist } from "../stores/types";

const { playlist } = defineProps<{ playlist: Playlist }>();
const percentile = computed(() =>
  playlist.rating.percentile < 50
    ? `Bottom ${playlist.rating.percentile} %`
    : `Top ${(100 - playlist.rating.percentile).toFixed(1)} %`
);
const percentileColor = computed(
  () =>
    // Color between red (hue 0deg) through yellow, green, and finally cyan (hue 180deg).
    `hsl(${(180 * playlist.rating.percentile) / 100}deg, 100%, 50%)`
);
</script>

<template>
  <div class="card">
    <img :src="playlist.tier.iconUrl" :alt="playlist.tier.name" />
    <span>
      <div>{{ playlist.playlistName }}</div>
      <div>
        {{ playlist.division.name }}
        <span class="percentile">{{ percentile }}</span>
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
  vertical-align: bottom;
  color: v-bind(percentileColor);
  margin-left: 0.25ex;
}
img {
  width: 56px;
}
</style>
