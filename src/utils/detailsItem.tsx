import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailWeatherInfoType } from "../components/TodayForecast";
import { getWindDirection } from "./windFormatter";

export const getCurrentWeatherDetailsItemFrom = (data: IDailyFormattedForecastResponse): DetailWeatherInfoType[] => [
  {
    iconName: "sunrise",
    value: `${data.sunrise}`,
    label: "Sunrise"
  },
  {
    iconName: "sunset",
    value: `${data.sunset}`,
    label: "Sunset"
  },
  {
    iconName: "moonrise",
    value: `${data.moonrise}`,
    label: "Moonrise"
  },
  {
    iconName: "moonset",
    value: `${data.moonset}`,
    label: "Moonset"
  },
  {
    iconName: "overcast",
    value: `${data.clouds} %`,
    label: "Cloudiness"
  },
  {
    iconName: "uv-index",
    value: `${Math.round(data.uvi)} / 10`,
    label: "Index UV"
  },
  {
    iconName: "barometer",
    value: `${data.pressure} hPa`,
    label: "Pressure"
  },
  {
    iconName: "windsock",
    value: `${data.wind_speed.toString()} m/s (${getWindDirection(data.wind_deg)})`,
    label: "Wind"
  },
  {
    iconName: "humidity",
    value: `${data.humidity} %`,
    label: "Humidity"
  }
];