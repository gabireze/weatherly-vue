<script lang="ts" setup>
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
</script>

<template>
  <div class="text-center mb-4">
    <h1 class="text-2xl font-bold">{{ props.current.city }}</h1>
    <img
      class="w-16 h-16 mx-auto"
      :src="`https://openweathermap.org/img/wn/${props.current.icon}@2x.png`"
      :alt="props.current.description"
    />
    <div class="text-6xl font-light my-2">{{ props.current.temp }}°C</div>
    <p class="text-sm mb-2 italic">{{ props.current.description }}</p>
  </div>

  <div class="text-left text-sm space-y-1">
    <p>Sensação térmica: {{ props.current.feels_like }}°C</p>
    <p>
      Mínima: {{ props.current.temp_min }}°C | Máxima:
      {{ props.current.temp_max }}°C
    </p>
    <p>Pressão: {{ props.current.pressure }} hPa</p>
    <p>Umidade: {{ props.current.humidity }}%</p>
    <p>
      Vento: {{ props.current.wind_speed }} m/s, direção
      {{ props.current.wind_deg }}°
    </p>
  </div>
</template>
