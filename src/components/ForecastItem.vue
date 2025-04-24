<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useWeatherStore, ForecastDay } from "../stores/weatherStore";

const props = defineProps<{ day: ForecastDay }>();
const router = useRouter();
const store = useWeatherStore();

function goToDetails() {
  store.setForecast(props.day);
  console.log("Forecast set:", props.day);
  router.push({
    name: "WeatherDetails",
    params: { timestamp: props.day.timestamp.toString() },
  });
}
</script>

<template>
  <div
    class="flex justify-between items-center border-t border-white/30 py-1 cursor-pointer hover:bg-white/10 transition"
    @click="goToDetails"
  >
    <span class="text-sm w-1/3">{{ props.day.day }}</span>
    <img
      class="w-6 h-6 mx-auto"
      :src="`https://openweathermap.org/img/wn/${props.day.icon}.png`"
      :alt="props.day.description"
    />
    <span class="text-sm w-1/3 text-right">
      {{ props.day.temp_max }}° {{ props.day.temp_min }}°
    </span>
  </div>
</template>
