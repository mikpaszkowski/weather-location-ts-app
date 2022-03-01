import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";

export const getCurrentWeatherDetailsChartData = (data: IDailyFormattedForecastResponse): any[] => [
  {
    name: "5:00",
    temperature: data.feelsLike.morn
  },
  {
    name: "12:00",
    temperature: data.feelsLike.day
  },
  {
    name: "20:00",
    temperature: data.feelsLike.eve
  },
  {
    name: "1:00",
    temperature: data.feelsLike.night
  }
];