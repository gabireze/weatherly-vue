<script lang="ts" setup>
import { ref, watchEffect, computed } from "vue";
import { useWeatherStore } from "../stores/weatherStore";
import { useRoute } from "vue-router";
import { Vue3Lottie } from "vue3-lottie";

const store = useWeatherStore();
const route = useRoute();

const forecast = computed(() =>
  store.forecast.find((f) => f.timestamp === Number(route.params.timestamp))
);

const animations = import.meta.glob("../assets/lottie/*.json", {
  eager: true,
  import: "default",
});
const selectedAnimation = ref();

watchEffect(() => {
  const iconCode = forecast.value?.icon;
  if (iconCode) {
    const match = Object.entries(animations).find(([path]) =>
      path.endsWith(`/${iconCode}.json`)
    );
    selectedAnimation.value =
      match?.[1] || animations["../assets/lottie/01d.json"];
  }
});
</script>

<template>
  <Transition name="fade-page" appear>
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white"
    >
      <div
        class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-[360px] text-center"
      >
        <h1 class="text-2xl font-bold mb-4">
          {{ forecast?.day }} - {{ forecast?.date }}
        </h1>

        <Transition name="fade">
          <template v-if="forecast">
            <div>
              <Vue3Lottie
                v-if="selectedAnimation"
                :animationData="selectedAnimation"
                :loop="true"
                :autoplay="true"
                style="width: 120px; height: 120px; margin: auto"
              />
              <p class="text-lg font-medium mt-4">{{ forecast.description }}</p>
              <div class="text-sm mt-4 space-y-1">
                <p>
                  🌡️ Temperatura: {{ forecast.temp_min }}°C ~
                  {{ forecast.temp_max }}°C
                </p>
                <p>💧 Umidade: {{ forecast.humidity }}%</p>
                <p>🌬️ Vento: {{ forecast.wind_speed }} m/s</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-white/70 text-sm italic mt-4">
              Dados indisponíveis.<br />
              Volte para a tela inicial.
            </div>
          </template>
        </Transition>

        <router-link
          to="/"
          class="inline-block mt-6 underline text-blue-300 hover:text-white transition text-sm"
        >
          ← Voltar
        </router-link>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to,
.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
