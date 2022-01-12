import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDailyFormattedForecastResponse } from '../../services/api/wetherAPI';
import { AppDispatch, RootState } from '../rootStore';
import { ICurrWeatherResponseContent } from '../../utils/formatWeatherResponse';
import weatherService, {
	IHourlyForecastResponse,
} from '../../services/api/wetherAPI';
import geocodingService from '../../services/api/reverseAndForwardGeocodingAPI';
import { getCoordinates } from '../../utils/coordinates';

export const initialState: IForecast = {
	current: {
		city: '',
		date: '',
		country: '',
		lat: 0,
		lon: 0,
		humidity: 0,
		pressure: 0,
		temp: 0,
		tempMax: 0,
		tempMin: 0,
		sunrise: 0,
		sunset: 0,
		description: '',
		icon: '',
		windSpeed: 0,
		clouds: 0,
	},
	daily: [
		{
			date: '',
			sunrise: '',
			sunset: '0',
			moonrise: '0',
			moonset: '0',
			moon_phase: 0,
			temp: {
				day: 0,
				min: 0,
				max: 0,
				night: 0,
				eve: 0,
				morn: 0,
			},
			feelsLike: {
				day: 0,
				night: 0,
				eve: 0,
				morn: 0,
			},
			pressure: 0,
			humidity: 0,
			dew_point: 0,
			wind_speed: 0,
			wind_deg: 0,
			weather: [
				{
					id: 0,
					main: '',
					description: '',
					icon: '',
				},
			],
			clouds: 0,
			precipitation: 0,
			rain: 0,
			uvi: 0,
		},
	],
	hourly: [
		{
			icon: '',
			hour: '',
			temperature: 0,
			precipitation: 0,
		},
	],
	loading: true,
	searchError: false,
};

export interface IForecast {
	current: ICurrWeatherResponseContent;
	daily: Array<IDailyFormattedForecastResponse>;
	hourly: Array<IHourlyForecastResponse>;
	loading: boolean;
	searchError: boolean;
}

export type ForecastDispatchError = {
	errorMessage: string;
};

export const fetchForecast = createAsyncThunk<
	IForecast,
	string,
	{
		dispatch: AppDispatch;
		state: RootState;
		rejectValue: ForecastDispatchError;
	}
>('forecast/fetch', async (cityName, thunkAPI) => {
	try {
		const geocodingData = await geocodingService.getGeocodingDataByCityName(
			cityName
		);
		const response = await weatherService.getAllTypeForecast(
			getCoordinates(geocodingData),
			cityName
		);
		return {
			current: response.current,
			daily: response.daily,
			hourly: response.hourly,
			loading: false,
			searchError: false,
		};
	} catch (err) {
		return thunkAPI.rejectWithValue(err as ForecastDispatchError);
	}
});

export const currWeatherSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<IForecast>) => {
			state.loading = false;
			return payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchForecast.pending, (state, { payload }) => {
			state.loading = true;
		});
		builder.addCase(fetchForecast.fulfilled, (state, { payload }) => payload);
		builder.addCase(fetchForecast.rejected, (state, action) => {
			state.searchError = true;
			state.loading = false;
		});
	},
});

export const { set } = currWeatherSlice.actions;
export const selectCurrentWeather = (state: RootState) =>
	state.forecast.current;
export const selectDailyForecast = (state: RootState) => state.forecast.daily;
export const selectHourlyForecast = (state: RootState) => state.forecast.hourly;
export const selectSearchError = (state: RootState) =>
	state.forecast.searchError;
export default currWeatherSlice.reducer;
