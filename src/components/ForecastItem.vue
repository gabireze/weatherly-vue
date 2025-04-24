<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

interface Props {
  day: string;
  icon: any;
  iconName: string; // você vai precisar adicionar isso no ForecastList
  high: number | string;
  low: number | string;
}

const props = defineProps<Props>();

function goToDetails() {
  router.push({
    name: "WeatherDetails",
    params: { day: props.day },
    state: {
      forecast: {
        day: props.day,
        temp_max: Number(props.high),
        temp_min: Number(props.low),
        weather: props.iconName,
      },
    },
  });
}
</script>

<template>
  <div
    @click="goToDetails"
    class="flex justify-between items-center border-t border-white/30 py-1 cursor-pointer hover:bg-white/10 transition"
  >
    <span class="text-sm w-1/3">{{ props.day }}</span>
    <span class="w-1/3 text-center">
      <component :is="props.icon" class="w-5 h-5 text-white inline" />
    </span>
    <span class="text-sm w-1/3 text-right">
      {{ props.high }}° {{ props.low }}°
    </span>
  </div>
</template>
