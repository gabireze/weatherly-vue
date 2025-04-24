<script lang="ts" setup>
import { useWeatherStore } from "../stores/weatherStore";
import { computed } from "vue";

const store = useWeatherStore();
const forecast = computed(() => store.selectedForecast);
</script>

<template>
  <div
    class="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center p-6"
  >
    <h1 class="text-3xl font-bold mb-4">Detalhes do dia</h1>

    <div v-if="forecast">
      <p class="text-lg">Dia: {{ forecast.day }}</p>
      <p class="text-lg">Clima: {{ forecast.weather }}</p>
      <p class="text-lg">Máxima: {{ forecast.temp_max }}°</p>
      <p class="text-lg">Mínima: {{ forecast.temp_min }}°</p>
    </div>

    <div v-else class="text-white/70 text-sm italic">
      Dados indisponíveis.<br />
      Volte para a tela inicial.
    </div>

    <router-link to="/" class="mt-6 underline text-blue-200 hover:text-white">
      ← Voltar
    </router-link>
  </div>
</template>
