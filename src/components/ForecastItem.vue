<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useWeatherStore, ForecastDay } from "../stores/weatherStore";

const props = defineProps<{ day: ForecastDay }>();
const router = useRouter();
const store = useWeatherStore();

function goToDetails() {
  store.setForecast(props.day);
  router.push({
    name: "WeatherDetails",
    params: { timestamp: props.day.timestamp.toString() },
  });
}
</script>

<template>
  <div
    @click="goToDetails"
    class="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 group"
  >
    <span
      class="text-sm font-medium w-1/3 group-hover:scale-105 transition-transform"
    >
      {{ props.day.day }}<br />
      <small>{{ props.day.date }}</small>
    </span>

    <img
      class="w-8 h-8 transition-transform group-hover:scale-110"
      :src="`https://openweathermap.org/img/wn/${props.day.icon}.png`"
      :alt="props.day.description"
    />

    <span class="text-sm font-medium w-1/3 text-right">
      🔺{{ Math.round(props.day.temp_max) }}° 🔻{{
        Math.round(props.day.temp_min)
      }}°
    </span>
  </div>
</template>
