<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useWeatherStore, ForecastDay } from "../stores/weatherStore";

interface CurrentWeather {
  city: string;
  temp: number;
  high: number;
  low: number;
}

const props = defineProps<{
  current: CurrentWeather;
  forecast: ForecastDay[];
}>();

const router = useRouter();
const store = useWeatherStore();

function goToDetails(day: ForecastDay) {
  store.setForecast(day);
  router.push({ name: "WeatherDetails", params: { day: day.day } });
}
</script>

<template>
  <div
    class="text-center p-4 text-white bg-gradient-to-b from-blue-900 to-blue-700 rounded-xl w-[320px] mx-auto"
  >
    <div class="mb-4">
      <h1 class="text-2xl font-bold">{{ props.current.city }}</h1>
      <div class="text-6xl font-light my-2">{{ props.current.temp }}°</div>
      <p class="text-sm">
        H:{{ props.current.high }}° L:{{ props.current.low }}°
      </p>
    </div>

    <div
      v-for="day in props.forecast"
      :key="day.day"
      class="flex justify-between py-1 border-t border-white/30 cursor-pointer hover:bg-white/10 transition"
      @click="goToDetails(day)"
    >
      <span class="text-sm">{{ day.day }}</span>
      <span class="text-sm">{{ day.temp_max }}° {{ day.temp_min }}°</span>
    </div>
  </div>
</template>
