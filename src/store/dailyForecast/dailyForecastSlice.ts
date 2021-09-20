import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDailyForecastResponse } from '../../services/api/wetherAPI';
import { RootState } from '../rootStore';
import { AppDispatch } from '../rootStore';
import weatherService from '../../services/api/wetherAPI';
import geocodingService from '../../services/api/reverseAndForwardGeocodingAPI';
import { getCoordinates } from '../../utils/coordinates';

const initialState: IDailyForecast = {
	content: [
		{
			dt: 0,
			sunrise: 0,
			sunset: 0,
			moonrise: 0,
			moonset: 0,
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
			pop: 0,
			rain: 0,
			uvi: 0,
		},
	],
	loading: true,
};

export interface IDailyForecast {
	content: Array<IDailyForecastResponse>;
	loading: boolean;
}

export const fetchDailyForecast = createAsyncThunk<
	IDailyForecast,
	string,
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('dailyForecast/fetchDailyForecast', async (cityName, thunkAPI) => {
	const geocodingData = await geocodingService.getGeocodingDataByCityName(
		cityName
	);
	const response = await weatherService.getDailyForecastByCoordinates(
		getCoordinates(geocodingData)
	);
	return {
		content: response,
		loading: false,
	};
});

export const dailyForecastSlice = createSlice({
	name: 'dailyForecast',
	initialState,
	reducers: {
		setDailyForecast: (state, { payload }: PayloadAction<IDailyForecast>) =>
			payload,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDailyForecast.pending, (state, { payload }) => {
			state.loading = true;
		});
		builder.addCase(
			fetchDailyForecast.fulfilled,
			(state, { payload }) => payload
		);
	},
});

export const { setDailyForecast } = dailyForecastSlice.actions;
export const dailyForecastSelector = (state: RootState) =>
	state.dailyForecast.content;
export const isDailyForecastLoaded = (state: RootState) =>
	state.dailyForecast.loading;
export default dailyForecastSlice.reducer;
