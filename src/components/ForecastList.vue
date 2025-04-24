<script lang="ts" setup>
import ForecastItem from "./ForecastItem.vue";
import type { ForecastDay } from "../stores/weatherStore";

const props = defineProps<{ items: ForecastDay[] }>();
</script>

<template>
  <div class="mt-6 space-y-2">
    <ForecastItem v-for="day in props.items" :key="day.day" :day="day" />
  </div>
</template>
