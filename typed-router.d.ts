// src/typed-router.d.ts
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {}

  interface CustomRouteParams {
    WeatherDetails: { day: string };
  }

  interface RouteNamedMap {
    WeatherDetails: {
      name: "WeatherDetails";
      params: { day: string };
      state: { forecast: any }; // se quiser, refine com ForecastDay
    };
  }
}
