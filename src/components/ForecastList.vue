<script lang="ts" setup>
import ForecastItem from "./ForecastItem.vue";
import { SunIcon, CloudIcon } from "@heroicons/vue/24/outline";

interface ForecastEntry {
  day: string;
  temp_max: number;
  temp_min: number;
  weather: string;
}

const props = defineProps<{
  items: ForecastEntry[];
}>();

function getIconComponent(weather: string) {
  return weather.includes("cloud") ? CloudIcon : SunIcon;
}

function getIconName(weather: string): string {
  return weather.includes("cloud") ? "cloudy" : "sunny";
}
</script>

<template>
  <div class="mt-4">
    <ForecastItem
      v-for="item in items"
      :key="item.day"
      :day="item.day"
      :high="Math.round(item.temp_max)"
      :low="Math.round(item.temp_min)"
      :icon="getIconComponent(item.weather)"
      :iconName="getIconName(item.weather)"
    />
  </div>
</template>
