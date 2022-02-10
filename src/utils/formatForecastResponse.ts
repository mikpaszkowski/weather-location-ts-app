import {
  IDailyForecastResponse,
  IDailyFormattedForecastResponse,
  IHourlyForecastResponse,
  TempDailyType
} from "../services/api/wetherAPI";
import { getBasicTimeFormatFromTimestamp, getDayFromTimeStamp } from "./timeUtility";

export interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IForecastResponse {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Array<IWeather>;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

const getHourForecast = (data: IForecastResponse): IHourlyForecastResponse => {
  return {
    icon: data.weather[0].icon,
    hour: getBasicTimeFormatFromTimestamp(data.dt),
    temperature: Math.round(data.temp),
    precipitation: Math.floor(data.pop * 100)
  };
};

export const formatHourlyForecastResponse: Function = (
  data: Array<IForecastResponse>
): Array<IHourlyForecastResponse> => {
  return data.map((forecast) => getHourForecast(forecast));
};

const formatDateOfDailyForecastResponse: Function = (
  data: IDailyForecastResponse
): IDailyFormattedForecastResponse => {
  return {
    date: getDayFromTimeStamp(data.dt),
    sunrise: getBasicTimeFormatFromTimestamp(data.sunrise),
    sunset: getBasicTimeFormatFromTimestamp(data.sunset),
    moonrise: getBasicTimeFormatFromTimestamp(data.moonrise),
    moonset: getBasicTimeFormatFromTimestamp(data.moonset),
    moonPhase: Math.floor(data.moon_phase * 100),
    temp: formatTempData(data.temp),
    feelsLike: data.feelsLike,
    pressure: data.pressure,
    humidity: data.humidity,
    dew_point: data.dew_point,
    wind_speed: data.wind_speed,
    wind_deg: data.wind_deg,
    weather: data.weather,
    clouds: data.clouds,
    precipitation: Math.floor(data.pop * 100),
    rain: data.rain,
    uvi: data.uvi
  };
};

export const formatDailyForecastResponse: Function = (
  data: Array<IDailyForecastResponse>
): Array<IDailyFormattedForecastResponse> => {
  return data.map((forecast) => formatDateOfDailyForecastResponse(forecast));
};

const formatTempData: Function = (data: TempDailyType): TempDailyType => {
  return {
    day: Math.round(data.day),
    min: Math.round(data.min),
    max: Math.round(data.max),
    night: Math.round(data.night),
    eve: Math.round(data.eve),
    morn: Math.round(data.morn)
  };
};
