<script lang="ts" setup>
import { useWeatherStore } from "../stores/weatherStore";
import { useRoute } from "vue-router";
import { computed } from "vue";

const store = useWeatherStore();
const route = useRoute();

const forecast = computed(() =>
  store.forecast.find((f) => f.timestamp === Number(route.params.timestamp))
);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-black">
    <div
      class="bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl p-4 w-[320px] shadow-xl"
    >
      <h1 class="text-3xl font-bold mb-4">Detalhes do dia</h1>

      <div v-if="forecast">
        <img
          class="w-20 h-20 mb-4"
          :src="`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`"
          :alt="forecast.description"
        />
        Detalhes do dia: {{ forecast?.day }} - {{ forecast?.date }}
        <p class="text-lg">Clima: {{ forecast.description }}</p>
        <p class="text-lg">Máxima: {{ forecast.temp_max }}°C</p>
        <p class="text-lg">Mínima: {{ forecast.temp_min }}°C</p>
        <p class="text-lg">Umidade: {{ forecast.humidity }}%</p>
        <p class="text-lg">Vento: {{ forecast.wind_speed }} m/s</p>
      </div>

      <div v-else class="text-white/70 text-sm italic">
        Dados indisponíveis.<br />
        Volte para a tela inicial.
      </div>

      <router-link to="/" class="mt-6 underline text-blue-200 hover:text-white">
        ← Voltar
      </router-link>
    </div>
  </div>
</template>
