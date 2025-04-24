import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";
import { createPinia } from "pinia";
import Vue3Lottie from "vue3-lottie";
import { createI18n } from "vue-i18n";

import ptBR from "./locales/pt-BR.json";
import en from "./locales/en.json";

const browserLang = navigator.language || navigator.languages[0];
const detectedLocale = browserLang.startsWith("pt") ? "pt-BR" : "en";

const savedLocale = localStorage.getItem("lang");

const i18n = createI18n({
  legacy: false,
  locale: savedLocale || detectedLocale,
  fallbackLocale: "en",
  messages: {
    "pt-BR": ptBR,
    en,
  },
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Vue3Lottie, { name: "LottieAnimation" });
app.use(i18n);
app.mount("#app");
