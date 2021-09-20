import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../rootStore';
import { ICurrWeatherResponseContent } from '../../utils/formatWeatherResponse';
import weatherService from '../../services/api/wetherAPI';

export const initialState: ICurrWeather = {
	content: {
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
	loading: true,
};

export interface ICurrWeather {
	content: ICurrWeatherResponseContent;
	loading: boolean;
}

export const fetchCurrWeather = createAsyncThunk<
	ICurrWeather,
	string,
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('currWeather/fetchCurrWeather', async (cityName, thunkAPI) => {
	const response = await weatherService.getCurrentWeatherByCityName(cityName);
	return {
		content: response,
		loading: false,
	};
});

export const currWeatherSlice = createSlice({
	name: 'currWeather',
	initialState,
	reducers: {
		set: (state, { payload }: PayloadAction<ICurrWeather>) => {
			state.loading = false;
			return payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCurrWeather.pending, (state, { payload }) => {
			state.loading = true;
		});
		builder.addCase(
			fetchCurrWeather.fulfilled,
			(state, { payload }) => payload
		);
	},
});

export const { set } = currWeatherSlice.actions;
export const selectCurrentWeather = (state: RootState) =>
	state.currWeather.content;
export const isCurrentWeatherLoading = (state: RootState) =>
	state.currWeather.loading;
export default currWeatherSlice.reducer;
