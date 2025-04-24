<script lang="ts" setup>
import { onMounted } from "vue";
import { useWeather } from "../composables/useWeather";
import CurrentWeather from "../components/CurrentWeather.vue";
import ForecastList from "../components/ForecastList.vue";

const { current, forecast, fetchWeather } = useWeather();
onMounted(fetchWeather);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-black">
    <div
      class="bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl p-4 w-[320px] shadow-xl"
    >
      <CurrentWeather v-if="current" :current="current" />
      <ForecastList v-if="forecast.length" :items="forecast" />
    </div>
  </div>
</template>
