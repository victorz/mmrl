<script setup lang="ts">
import { useTrackerStore } from "../stores/tracker";

const props = defineProps<{ profileId: string }>();
const tracker = useTrackerStore();
await tracker.getTrackerData(props.profileId);
</script>

<template>Current season: {{ tracker.currentSeason }}</template>

<style scoped></style>
