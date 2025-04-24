import axios from "axios";
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = import.meta.env.VITE_WEATHER_CITY || "Campinas";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

interface CurrentWeather {
  city: string;
  temp: number;
  high: number;
  low: number;
}

interface ForecastDay {
  day: string;
  temp_min: number;
  temp_max: number;
  weather: string;
}

export function useWeather() {
  const current = ref<CurrentWeather | null>(null);
  const forecast = ref<ForecastDay[]>([]);
  const loading = ref(true);

  async function fetchWeather(): Promise<void> {
    loading.value = true;

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}weather?q=${CITY}&units=metric&appid=${API_KEY}`),
        axios.get(
          `${BASE_URL}forecast?q=${CITY}&units=metric&appid=${API_KEY}`
        ),
      ]);

      current.value = {
        city: weatherRes.data.name,
        temp: Math.round(weatherRes.data.main.temp),
        high: Math.round(weatherRes.data.main.temp_max),
        low: Math.round(weatherRes.data.main.temp_min),
      };

      const forecastMap: Record<string, ForecastDay> = {};

      forecastRes.data.list.forEach((item: any) => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en", { weekday: "short" });

        if (!forecastMap[day]) {
          forecastMap[day] = {
            day,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            weather: item.weather[0].main.toLowerCase(),
          };
        } else {
          forecastMap[day].temp_min = Math.min(
            forecastMap[day].temp_min,
            item.main.temp_min
          );
          forecastMap[day].temp_max = Math.max(
            forecastMap[day].temp_max,
            item.main.temp_max
          );
        }
      });

      forecast.value = Object.values(forecastMap).slice(0, 5);
    } catch (e) {
      console.error("Erro ao buscar dados do clima:", e);
    }

    loading.value = false;
  }

  return {
    current,
    forecast,
    loading,
    fetchWeather,
  };
}
