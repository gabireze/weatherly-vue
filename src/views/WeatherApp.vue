<script lang="ts" setup>
import { onMounted } from "vue";
import { useWeather } from "../composables/useWeather";
import CurrentWeather from "../components/CurrentWeather.vue";
import ForecastList from "../components/ForecastList.vue";

const { current, forecast, fetchWeather } = useWeather();
onMounted(fetchWeather);
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black"
  >
    <div
      class="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 w-[360px] text-white transition-all duration-500"
    >
      <Transition name="fade" mode="out-in">
        <CurrentWeather v-if="current" :current="current" />
      </Transition>
      <Transition name="fade" mode="out-in">
        <ForecastList v-if="forecast.length" :items="forecast" />
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
