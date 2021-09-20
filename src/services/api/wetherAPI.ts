import axios from 'axios';
import {
	formatWeatherResponse,
	ICurrWeatherResponseContent,
} from '../../utils/formatWeatherResponse';
import { formatHourlyForecastResponse } from '../../utils/formatForecastResponse';

const getCurrentWeatherByCityName: Function = async (
	cityName: string,
	units: string = 'metric',
	lang: string = 'en'
): Promise<ICurrWeatherResponseContent> => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=${
			process.env.REACT_APP_WEATHER_API_KEY
		}&units=${units}&lang=${lang}`
	);
	console.log(response);
	return formatWeatherResponse(response.data);
};

export interface ICoordinates {
	lat: number;
	long: number;
}

export interface IHourlyForecastResponse {
	icon: string;
	hour: string;
	temperature: number;
	precipitation: number;
}

const getHourlyForecastByCoordinates: Function = async (
	coordinates: ICoordinates,
	units: string = 'metric',
	lang: string = 'en'
): Promise<Array<IHourlyForecastResponse>> => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}&lang=${lang}&exclude=current,minutely,daily`
	);
	return formatHourlyForecastResponse(response.data.hourly);
};

export interface IDailyForecastResponse {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: TempDailyType;
	feelsLike: FeelsLikeType;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	weather: Array<WeatherDescType>;
	clouds: number;
	pop: number;
	rain: number;
	uvi: number;
}

export type TempDailyType = {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
};

export type FeelsLikeType = {
	day: number;
	night: number;
	eve: number;
	morn: number;
};

export type WeatherDescType = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

const getDailyForecastByCoordinates: Function = async (
	coordinates: ICoordinates,
	units: string = 'metric',
	lang: string = 'eng'
): Promise<Array<IDailyForecastResponse>> => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}&lang=${lang}&exclude=current,minutely,hourly`
	);
	return response.data.daily;
};

const weatherService = {
	getCurrentWeatherByCityName,
	getDailyForecastByCoordinates,
	getHourlyForecastByCoordinates,
};

export default weatherService;
