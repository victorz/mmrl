<script lang="ts" setup>
import { ref, watch } from "vue";
import { TabName } from "./types";

const emit = defineEmits<{
  (event: "changetab", tabName: TabName): void;
}>();

const activeTab = ref<TabName>(TabName.Overview);

watch(
  () => activeTab.value,
  () => emit("changetab", activeTab.value)
);
</script>

<template>
  <nav>
    <input
      v-model="activeTab"
      id="overview"
      name="tab"
      type="radio"
      value="overview"
    />
    <label for="overview">Overview</label>
    <input
      v-model="activeTab"
      id="history"
      name="tab"
      type="radio"
      value="history"
    />
    <label for="history">History</label>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  background-color: var(--color-primary);
  border-bottom: 1px solid var(--color-highlight);
  padding: 0 16px;
}
input {
  display: none;
}

label {
  color: white;
  user-select: none;
  cursor: pointer;
  padding: 8px;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

input:checked + label {
  text-shadow: 0px 0px 16px currentColor;
  border-left: 1px solid #59003a;
  border-right: 1px solid #59003a;
  box-shadow: 0px 0px 16px #59003a;
}
</style>
