# 🌦️ Weatherly Vue

**Weatherly Vue** is an elegant and modern weather forecast application built with **Vue 3**, **Vite**, and **Tailwind CSS**.  
It provides real-time weather data and 5-day forecasts with support for **geolocation**, **internationalization**, and **beautiful Lottie animations**.

---

## 🚀 Features

- 📍 Geolocation support
- 🌤️ Current weather and 5-day forecast
- 🌍 Multilingual: English & Portuguese (auto-detects browser language)
- ✨ Skeleton loaders while fetching data
- 🎞️ Animated weather icons using Lottie
- ⚡️ Fast Vite build and optimized performance
- 🎨 Styled with Tailwind CSS
- ☁️ Responsive and mobile-friendly

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Lottie Web](https://airbnb.io/lottie/)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/gabireze/weatherly-vue.git
cd weatherly-vue

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 🌐 Environment Variables

Create a `.env` file with the following:

```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_WEATHER_CITY=
```

You can obtain a free API key from [OpenWeatherMap](https://openweathermap.org/api).

---

## 📁 Project Structure

```
weatherly-vue/
│
├── public/                 # Icons, manifest, preview image
├── src/
│   ├── assets/             # Lottie JSON animations
│   ├── components/         # UI components
│   ├── composables/        # Custom logic (e.g., useWeather)
│   ├── router/             # Vue Router config
│   ├── stores/             # Pinia store
│   ├── views/              # Pages: WeatherApp & WeatherDetails
│   ├── locales/            # Language files (en.json, pt-BR.json)
│   └── main.ts             # App entry point
└── .env                    # Your environment variables
```

---

## 📱 PWA Ready

Includes favicon, icons, and `site.webmanifest` for better mobile support and installability.
