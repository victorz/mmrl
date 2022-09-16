<script setup lang="ts">
import { onErrorCaptured } from "vue";
import Navigation from "./components/Navigation.vue";
import TrackerData from "./components/TrackerData.vue";

onErrorCaptured((hook, target) => {
  console.error("error captured", hook, target);
});
</script>

<template>
  <Navigation />
  <Suspense>
    <TrackerData profile-id="victorz" />
    <!-- TODO: add a loading component, maybe that animates through all of the ranked icons -->
    <template #fallback><span class="loading">Loading</span></template>
  </Suspense>
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
