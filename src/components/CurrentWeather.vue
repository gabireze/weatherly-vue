<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface CurrentWeather {
  city: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  description: string;
  icon: string;
}

const props = defineProps<{ current: CurrentWeather }>();

const animations = import.meta.glob("../assets/lottie/*.json", {
  eager: true,
  import: "default",
});
const selectedAnimation = ref();

watchEffect(() => {
  const iconCode = props.current.icon;
  const match = Object.entries(animations).find(([path]) =>
    path.endsWith(`/${iconCode}.json`)
  );
  selectedAnimation.value =
    match?.[1] || animations["../assets/lottie/01d.json"];
});
</script>

<template>
  <div class="text-center mb-6">
    <h1 class="text-3xl font-semibold">{{ props.current.city }}</h1>
    <Vue3Lottie
      v-if="selectedAnimation"
      :animationData="selectedAnimation"
      :loop="true"
      :autoplay="true"
      style="width: 120px; height: 120px; margin: auto"
    />
    <div class="text-6xl font-thin mt-2">{{ props.current.temp }}°C</div>
    <p class="text-md italic opacity-80">{{ props.current.description }}</p>
  </div>

  <div class="grid grid-cols-2 gap-2 text-sm text-center mt-4">
    <p>🌡️ {{ t("weather.feels_like") }}: {{ props.current.feels_like }}°C</p>
    <p>💧 {{ t("weather.humidity") }}: {{ props.current.humidity }}%</p>
    <p>🔺 {{ t("weather.max") }}: {{ props.current.temp_max }}°C</p>
    <p>🔻 {{ t("weather.min") }}: {{ props.current.temp_min }}°C</p>
    <p>🌬️ {{ t("weather.wind") }}: {{ props.current.wind_speed }} m/s</p>
    <p>🧭 {{ t("weather.direction") }}: {{ props.current.wind_deg }}°</p>
  </div>
</template>
