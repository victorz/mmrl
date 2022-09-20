<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";
import HistoryChart from "./components/HistoryChart.vue";
import Navigation from "./components/Navigation.vue";
import TrackerData from "./components/TrackerData.vue";
import { ChartType, TabName } from "./components/types";
import { useTrackerStore } from "./stores/tracker";

onErrorCaptured((hook, target) => {
  console.error("error captured", hook, target);
});

const currentTab = ref<TabName>(TabName.Overview);
const trackerStore = useTrackerStore();
</script>

<template>
  <Navigation
    @changetab="
      (tabName) => {
        currentTab = tabName;
      }
    "
  />
  <main>
    <Suspense>
      <!-- TODO: add a loading component, maybe that animates through all of the ranked icons -->
      <TrackerData
        v-show="currentTab === TabName.Overview"
        profile-id="victorz"
      />
      <template #fallback><span class="loading">Loading</span></template>
    </Suspense>
    <HistoryChart
      v-if="currentTab === TabName.History && trackerStore.historyMap"
      :playlist-id="0"
      :history="trackerStore.historyMap.get(0) ?? []"
      :chart-type="ChartType.Line"
    />
  </main>
</template>

<style scoped>
main {
  padding: 0 1em;
}
.loading::after {
  animation: ellipsis 3s linear infinite;
  content: "...";
}

@keyframes ellipsis {
  from {
    content: "...";
  }
  33% {
    content: ".\a0\a0";
  }
  66% {
    content: "..\a0";
  }
}
</style>
