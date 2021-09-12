import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDailyForecast } from '../../services/api/wetherAPI';
import { RootState } from '../rootStore';

const initialState: Array<IDailyForecast> = [
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
];

export const dailyForecastSlice = createSlice({
	name: 'dailyForecast',
	initialState,
	reducers: {
		setDailyForecast: (
			state,
			{ payload }: PayloadAction<Array<IDailyForecast>>
		) => payload,
	},
});

export const { setDailyForecast } = dailyForecastSlice.actions;
export const dailyForecastSelector = (state: RootState) => state.dailyForecast;
export default dailyForecastSlice.reducer;
