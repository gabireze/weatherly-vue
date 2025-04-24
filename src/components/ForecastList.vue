<script lang="ts" setup>
import { TransitionGroup } from "vue";
import ForecastItem from "./ForecastItem.vue";
import type { ForecastDay } from "../stores/weatherStore";

const props = defineProps<{ items: ForecastDay[] }>();
</script>

<template>
  <TransitionGroup
    name="fade-stagger"
    tag="div"
    class="mt-6 space-y-3 divide-y divide-white/20"
  >
    <ForecastItem v-for="day in props.items" :key="day.timestamp" :day="day" />
  </TransitionGroup>
</template>

<style scoped>
.fade-stagger-enter-active {
  transition: all 0.4s ease;
}
.fade-stagger-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-stagger-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
