<script setup lang="ts">
import { onErrorCaptured } from "vue";
import TrackerData from "./TrackerData.vue";

onErrorCaptured((hook, target) => {
  console.error("error captured", hook, target);
});
</script>

<template>
  <Suspense>
    <TrackerData profile-id="victorz" />
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
    content: ".";
  }
  66% {
    content: "..";
  }
}
</style>
