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
    <template #fallback>Loading...</template>
  </Suspense>
</template>

<style scoped></style>
