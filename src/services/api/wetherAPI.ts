import axios from 'axios';
import {
	formatWeatherResponse,
	ICurrWeatherResponseContent,
} from '../../utils/formatWeatherResponse';
import {
	formatDailyForecastResponse,
	formatHourlyForecastResponse,
} from '../../utils/formatForecastResponse';
import { IForecast } from '../../store/forecast/forecastSlice';

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
	if (response.status === 200) {
		return formatWeatherResponse(response.data);
	}
	throw new Error(
		`Current weather search failure with status: ${response.status}`
	);
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
	if (response.status === 200) {
		return formatHourlyForecastResponse(response.data.hourly);
	}
	throw new Error(
		`Hourly forecast search failure with status: ${response.status}`
	);
};

export interface IDailyFormattedForecastResponse {
	date: string;
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moonPhase: number;
	temp: TempDailyType;
	feelsLike: FeelsLikeType;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	weather: Array<WeatherDescType>;
	clouds: number;
	precipitation: number;
	rain: number;
	uvi: number;
}

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
): Promise<Array<IDailyFormattedForecastResponse>> => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}&lang=${lang}&exclude=current,minutely,hourly`
	);
	if (response.status === 200) {
		return formatDailyForecastResponse(response.data.daily);
	}
	throw new Error(
		`Daily forecast search failure with status: ${response.status}`
	);
};

const getAllTypeForecast: Function = async (
	coordinates: ICoordinates,
	cityName: string
): Promise<IForecast> => {
	try {
		const current = await getCurrentWeatherByCityName(cityName);
		const daily = await getDailyForecastByCoordinates(coordinates);
		const hourly = await getHourlyForecastByCoordinates(coordinates);
		return {
			current: current,
			daily: daily,
			hourly: hourly,
			loading: false,
			searchError: false,
		};
	} catch (err) {
		throw new Error(`Forecast search failure with status. ${err}`);
	}
};

const weatherService = {
	getCurrentWeatherByCityName,
	getDailyForecastByCoordinates,
	getHourlyForecastByCoordinates,
	getAllTypeForecast,
};

export default weatherService;
