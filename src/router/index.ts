import { createRouter, createWebHistory } from "vue-router";
import WeatherApp from "../views/WeatherApp.vue";
import WeatherDetails from "../views/WeatherDetails.vue";

const routes = [
  {
    path: "/",
    component: WeatherApp,
  },
  {
    path: "/day/:timestamp",
    name: "WeatherDetails",
    component: WeatherDetails,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
