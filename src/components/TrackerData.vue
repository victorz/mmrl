<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ user: string }>();
console.debug("requesting data");
const res = await fetch(`http://localhost:3000/${props.user}`, {
  mode: "cors",
});
console.debug("requested data");

if (!res.ok) {
  console.error("fetch was not ok:", res);
}

const playerData = (await res.json()).data;

console.debug(playerData);

const ranks = computed(() =>
  playerData.segments.filter((s) => s.type === "playlist")
);
</script>

<template>
  <h1>Player data for {{ playerData.platformInfo.platformUserHandle }}</h1>
  <ol>
    <li v-for="rank in ranks" :key="rank.metadata.name">
      {{ rank.metadata.name }} | MMR: {{ rank.stats.rating.value }} ("{{
        rank.stats.tier.metadata.name
      }}")
      <img
        class="rank-icon"
        :src="rank.stats.tier.metadata.iconUrl"
        alt="rank icon"
      />
    </li>
  </ol>
</template>

<style scoped>
h1 {
  font-size: 24px;
}

img.rank-icon {
  width: 24px;
  transform: translateY(6px);
}
</style>
