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
</script>

<template>
  <div class="card">
    <img :src="playlist.tier.iconUrl" :alt="playlist.tier.name" />
    <span>
      <div>{{ playlist.playlistName }}</div>
      <div>{{ playlist.division.name }} ({{ percentile }})</div>
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
}
img {
  width: 56px;
}
</style>
