import { IHourlyForecastResponse } from '../services/api/wetherAPI';
import { getBasicTimeFormatFromTimestamp } from './timeUtility';

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
		precipitation: Math.floor(data.pop * 100),
	};
};

export const formatHourlyForecastResponse: Function = (
	data: Array<IForecastResponse>
): Array<IHourlyForecastResponse> => {
	return data.map((forecast) => getHourForecast(forecast));
};
