<script lang="ts" setup>
import { ref, watch } from "vue";

const activeTab = ref("overview");

watch(
  () => activeTab.value,
  () => console.log(activeTab.value)
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
}
input[type="radio"] {
  display: none;
}

label {
  user-select: none;
  cursor: pointer;
}

input:checked + label {
  color: red;
}
</style>
