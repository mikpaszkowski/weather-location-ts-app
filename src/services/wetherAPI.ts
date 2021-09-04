import axios from "axios";
import { formatWeatherResponse } from "../utils/formatWeatherResponse";
import { formatHourlyForecastResponse } from "../utils/formatForecastResponse";

export const getCurrentWeatherByCityName: Function = async (
  cityName: string,
  units: string = "metric",
  lang: string = "en"
) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }&units=${units}&lang=${lang}`
  );
  console.log(response)
  return formatWeatherResponse(response.data);
};

export interface ICoordinates {
  lat: number;
  long: number;
}

export interface IHourlyForecast {
  icon: string,
  hour: string,
  temperature: number,
  precipitation: number
}

export const getHourlyForecastByCoordinates: Function = async (
  coordinates: ICoordinates,
  units: string = "metric",
  lang: string = "en"
): Promise<Array<IHourlyForecast>> => {

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}&lang=${lang}&exclude=current,minutely,daily`
    );
    return formatHourlyForecastResponse(response.data.hourly)
};
