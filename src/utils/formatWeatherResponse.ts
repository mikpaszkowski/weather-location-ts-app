import { getBasicTimeFormatFromTimestamp, getFormattedDate, shiftByTimezoneOffset } from "./timeUtility";

export interface ICurrWeatherResponseContent {
  city: string;
  date: string;
  country: string;
  lat: number;
  lon: number;
  humidity: number;
  pressure: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  tempFeelsLike: number;
  sunrise: '';
  sunset: '';
  description: string;
  icon: string;
  windSpeed: number;
  windDeg: number;
  clouds: number;
}

export const formatWeatherResponse: Function = (data: any): ICurrWeatherResponseContent => {
  return {
    city: data.name,
    date: getFormattedDate(data.dt, data.timezone),
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temp: Math.round(data.main.temp),
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    tempFeelsLike: Math.round(data.main.feels_like),
    sunrise: getBasicTimeFormatFromTimestamp(shiftByTimezoneOffset(data.sys.sunrise, data.timezone)),
    sunset: getBasicTimeFormatFromTimestamp(shiftByTimezoneOffset(data.sys.sunset, data.timezone)),
    description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    clouds: data.clouds.all,
  };
};
