<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";
import Navigation from "./components/Navigation.vue";
import TrackerData from "./components/TrackerData.vue";
import { TabName } from "./components/types";

onErrorCaptured((hook, target) => {
  console.error("error captured", hook, target);
});

const currentTab = ref<TabName>(TabName.Overview);
</script>

<template>
  <Navigation
    @changetab="
      (tabName) => {
        currentTab = tabName;
      }
    "
  />
  <Suspense>
    <!-- TODO: add a loading component, maybe that animates through all of the ranked icons -->
    <TrackerData
      v-show="currentTab === TabName.Overview"
      profile-id="victorz"
    />
    <template #fallback><span class="loading">Loading</span></template>
  </Suspense>
  <div v-show="currentTab === TabName.History">History</div>
</template>

<style scoped>
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
