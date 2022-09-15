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
    <template #fallback><span class="loading">Loading</span></template>
  </Suspense>
</template>

<style scoped></style>
