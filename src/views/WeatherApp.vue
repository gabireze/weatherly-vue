<script lang="ts" setup>
import { onMounted } from "vue";
import { useWeather } from "../composables/useWeather";

import CurrentWeather from "../components/CurrentWeather.vue";
import ForecastList from "../components/ForecastList.vue";
import CurrentWeatherSkeleton from "../components/CurrentWeatherSkeleton.vue";
import ForecastListSkeleton from "../components/ForecastListSkeleton.vue";

const { current, forecast, loading, fetchWeather } = useWeather();

onMounted(fetchWeather);
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black"
  >
    <div
      class="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 w-[360px] text-white transition-all duration-500"
    >
      <!-- Wrapper fixo para evitar warning do Vue -->
      <Transition name="fade" mode="out-in">
        <div key="current" class="w-full">
          <component
            :is="loading ? CurrentWeatherSkeleton : CurrentWeather"
            :current="current"
          />
        </div>
      </Transition>

      <Transition name="fade" mode="out-in">
        <div key="forecast" class="w-full">
          <component
            :is="loading ? ForecastListSkeleton : ForecastList"
            :items="forecast"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
