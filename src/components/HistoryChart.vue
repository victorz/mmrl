<script lang="ts" setup>
import { max, mean, min, prop } from "ramda";
import { computed, ref } from "vue";
import { HistoryPoint, PlaylistId } from "../api/types";
import { useTrackerStore } from "../stores/tracker";
import { ChartType } from "./types";

const props = defineProps<{
  playlistId: PlaylistId;
  history: HistoryPoint[];
  chartType: ChartType;
}>();

const store = useTrackerStore();

const mmr = computed(() => props.history.map(prop("rating")) ?? []);
const mmrMax = computed(() => mmr.value.reduce(max, 0));
const mmrMin = computed(() => mmr.value.reduce(min, mmrMax.value));
const mmrAvg = computed(() => mean(mmr.value));
const chartHeight = 400;
const svgRef = ref<SVGElement>();
const chartWidth = computed(
  () => svgRef.value?.getBoundingClientRect().width ?? 1
);
</script>

<template>
  <h1>{{ store.playlistMap?.get(playlistId) ?? "Unknown playlist" }}</h1>
  <!-- preserveAspectRatio="xMidYMid slice" -->
  <svg
    class="chart"
    xmlns="http://www.w3.org/2000/svg"
    :width="chartWidth"
    :height="chartHeight"
    :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
    ref="svgRef"
  >
    <rect
      stroke="var(--color-highlight)"
      fill="none"
      stroke-width="1"
      x="0"
      :y="0"
      :width="chartWidth"
      :height="chartHeight"
    ></rect>
    <polyline
      stroke="white"
      stroke-width="1"
      fill="none"
      :points="
        mmr
          .map(
            (v, i) =>
              `${(chartWidth * i) / mmr.length}, ${
                chartHeight * (1 - v / mmrMax)
              }`
          )
          .join(' ')
      "
    ></polyline>
  </svg>
</template>

<style scoped>
h1 {
  font-size: 16px;
  margin-bottom: 0;
}
.chart {
  width: 100%;
  /* height: 100%; */
}
</style>
