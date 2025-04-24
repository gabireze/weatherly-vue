import { defineStore } from "pinia";

export interface ForecastDay {
  date: string;
  timestamp: number;
  day: string;
  temp_min: number;
  temp_max: number;
  weather: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  description: string;
}

export interface CurrentWeather {
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

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    selectedForecast: null as ForecastDay | null,
    current: JSON.parse(
      localStorage.getItem("weather-current") || "null"
    ) as CurrentWeather | null,
    forecast: JSON.parse(
      localStorage.getItem("weather-forecast") || "[]"
    ) as ForecastDay[],
  }),
  actions: {
    setForecast(day: ForecastDay) {
      this.selectedForecast = day;
    },
    setCurrent(data: CurrentWeather) {
      this.current = data;
      localStorage.setItem("weather-current", JSON.stringify(data));
    },
    setForecastList(data: ForecastDay[]) {
      this.forecast = data;
      localStorage.setItem("weather-forecast", JSON.stringify(data));
    },
  },
});
