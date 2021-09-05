import { IHourlyForecast } from "../services/wetherAPI";
import { getBasicTimeFormatFromTimestamp } from "./timeUtility";

export interface IWeather {
    description: string,
    icon: string,
    id: number,
    main: string
}

export interface IForecastResponse {
    clouds: number 
    dew_point: number
    dt: number 
    feels_like: number
    humidity: number 
    pop: number 
    pressure: number 
    temp: number
    uvi: number,
    visibility: number,
    weather: Array<IWeather>,
    wind_deg: number,
    wind_gust: number,
    wind_speed: number
}

const getHourForecast = (data: IForecastResponse): IHourlyForecast => {
    return {
        icon: data.weather[0].icon,
        hour: getBasicTimeFormatFromTimestamp(data.dt),
        temperature: Math.round(data.temp),
        precipitation: data.pop
    }
}

export const formatHourlyForecastResponse: Function = (data: Array<IForecastResponse>): Array<IHourlyForecast> => {
    return data.map(forecast => getHourForecast(forecast));
}