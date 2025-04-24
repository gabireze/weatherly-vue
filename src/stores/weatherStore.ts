import { defineStore } from "pinia";

export interface ForecastDay {
  day: string;
  temp_max: number;
  temp_min: number;
  weather: string;
}

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    selectedForecast: null as ForecastDay | null,
  }),
  actions: {
    setForecast(day: ForecastDay) {
      this.selectedForecast = day;
    },
  },
});
