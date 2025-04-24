import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { useWeatherStore } from "../stores/weatherStore";
import type { ForecastDay, CurrentWeather } from "../stores/weatherStore";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_WEATHER_CITY || "Campinas";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const CACHE_TTL = 30 * 60 * 1000;
const RATE_LIMIT = 60;

export function useWeather() {
  const loading = ref(true);
  const store = useWeatherStore();
  const { locale } = useI18n();

  function getUserLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => reject(err),
        { timeout: 10000 }
      );
    });
  }

  function getApiUsage(): number[] {
    const data = JSON.parse(localStorage.getItem("weather-api-usage") || "[]");
    return Array.isArray(data) ? data : [];
  }

  function registerApiCall(): void {
    const now = Date.now();
    const history = getApiUsage().filter((t) => now - t < 3600 * 1000);
    history.push(now);
    localStorage.setItem("weather-api-usage", JSON.stringify(history));
  }

  function isRateLimited(): boolean {
    const usage = getApiUsage().filter((t) => Date.now() - t < 3600 * 1000);
    return usage.length >= RATE_LIMIT;
  }

  async function fetchWeather(): Promise<void> {
    if (isRateLimited()) {
      console.warn("API rate limit reached. Try again later.");
      return;
    }

    const now = Date.now();
    let lat: number | null = null;
    let lon: number | null = null;
    let locationChanged = false;

    try {
      const location = await getUserLocation();
      lat = location.lat;
      lon = location.lon;

      const previous = JSON.parse(
        localStorage.getItem("weather-last-location") || "null"
      );
      const current = { lat, lon };

      if (
        !previous ||
        Math.abs(previous.lat - current.lat) > 0.01 ||
        Math.abs(previous.lon - current.lon) > 0.01
      ) {
        locationChanged = true;
        localStorage.setItem("weather-last-location", JSON.stringify(current));
      }
    } catch {
      console.warn("Geolocation failed, using default city");
    }

    const cachedAt = Number(localStorage.getItem("weather-cached-at"));
    const isCacheValid =
      store.current && store.forecast.length > 0 && now - cachedAt < CACHE_TTL;

    if (isCacheValid && !locationChanged) {
      loading.value = false;
      return;
    }

    loading.value = true;

    try {
      const lang = locale.value === "pt-BR" ? "pt_br" : "en";
      const baseParams = {
        units: "metric",
        lang,
        appid: API_KEY,
      };
      const locationParams = lat && lon ? { lat, lon } : { q: DEFAULT_CITY };

      const weatherRes = await axios.get(`${BASE_URL}/weather`, {
        params: { ...baseParams, ...locationParams },
      });
      registerApiCall();

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

      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: { ...baseParams, ...locationParams },
      });
      registerApiCall();

      const nowDate = new Date();
      const todayIso = new Date(
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
        const isoDate = dateObj.toISOString().split("T")[0];
        if (isoDate <= todayIso) return;

        const date = dateObj.toLocaleDateString(locale.value);
        const day = dateObj.toLocaleDateString(locale.value, {
          weekday: "short",
        });
        const dayTimestamp = new Date(`${isoDate}T12:00:00`).getTime();

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
      console.error("Error fetching weather data:", error);
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
