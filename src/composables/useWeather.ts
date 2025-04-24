import axios from "axios";
import { ref, computed } from "vue";
import { useWeatherStore } from "../stores/weatherStore";
import type { ForecastDay, CurrentWeather } from "../stores/weatherStore";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = import.meta.env.VITE_WEATHER_CITY || "Campinas";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutos

export function useWeather() {
  const loading = ref(true);
  const store = useWeatherStore();

  async function fetchWeather(): Promise<void> {
    const now = Date.now();
    const cachedAt = Number(localStorage.getItem("weather-cached-at"));

    if (
      store.current &&
      store.forecast.length > 0 &&
      now - cachedAt < CACHE_TTL
    ) {
      loading.value = false;
      return;
    }

    loading.value = true;

    try {
      // 1. Clima atual
      const weatherRes = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: CITY,
          units: "metric",
          lang: "pt_br",
          appid: API_KEY,
        },
      });

      const current: CurrentWeather = {
        city: weatherRes.data.name,
        temp: Math.round(weatherRes.data.main.temp),
        feels_like: Math.round(weatherRes.data.main.feels_like),
        temp_min: Math.round(weatherRes.data.main.temp_min),
        temp_max: Math.round(weatherRes.data.main.temp_max),
        pressure: weatherRes.data.main.pressure,
        humidity: weatherRes.data.main.humidity,
        wind_speed: weatherRes.data.wind.speed,
        wind_deg: weatherRes.data.wind.deg,
        description: weatherRes.data.weather[0].description,
        icon: weatherRes.data.weather[0].icon,
      };

      store.setCurrent(current);

      // 2. Previsão para os próximos dias
      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: CITY,
          units: "metric",
          lang: "pt_br",
          appid: API_KEY,
        },
      });

      const nowDate = new Date();
      const localDateString = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
      )
        .toISOString()
        .split("T")[0];

      const dayMap: Record<
        string,
        ForecastDay & { count: number; total_humidity: number }
      > = {};

      forecastRes.data.list.forEach((item: any) => {
        const timestamp = item.dt * 1000;
        const dateObj = new Date(timestamp);
        const date = dateObj.toISOString().split("T")[0];

        if (date <= localDateString) return; // ignora hoje e dias passados

        const day = dateObj.toLocaleDateString("pt-BR", { weekday: "short" });
        const dayTimestamp = new Date(`${date}T12:00:00`).getTime();

        if (!dayMap[date]) {
          dayMap[date] = {
            timestamp: dayTimestamp,
            date,
            day,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            weather: item.weather[0].main.toLowerCase(),
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed,
            description: item.weather[0].description,
            count: 1,
            total_humidity: item.main.humidity,
          };
        } else {
          dayMap[date].temp_min = Math.min(
            dayMap[date].temp_min,
            item.main.temp_min
          );
          dayMap[date].temp_max = Math.max(
            dayMap[date].temp_max,
            item.main.temp_max
          );
          dayMap[date].total_humidity += item.main.humidity;
          dayMap[date].count += 1;
        }
      });

      const forecastList = Object.values(dayMap)
        .map(({ count, total_humidity, ...day }) => ({
          ...day,
          humidity: Math.round(total_humidity / count),
        }))
        .slice(0, 5);

      store.setForecastList(forecastList);
      localStorage.setItem("weather-cached-at", now.toString());
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
    }

    loading.value = false;
  }

  return {
    loading,
    fetchWeather,
    current: computed(() => store.current),
    forecast: computed(() => store.forecast),
  };
}
