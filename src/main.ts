import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";
import { createPinia } from "pinia";
import Vue3Lottie from "vue3-lottie";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Vue3Lottie, { name: "LottieAnimation" })
  .mount("#app");
