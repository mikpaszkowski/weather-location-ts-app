import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import geocodingService from '../../services/api/reverseAndForwardGeocodingAPI';
import weatherService, {
	IHourlyForecastResponse,
} from '../../services/api/wetherAPI';
import { getCoordinates } from '../../utils/coordinates';
import { RootState } from '../rootStore';
import { AppDispatch } from '../rootStore';

const initialState: IHourlyForecast = {
	content: [
		{
			icon: '',
			hour: '',
			temperature: 0,
			precipitation: 0,
		},
	],
	loading: true,
};
export interface IHourlyForecast {
	content: Array<IHourlyForecastResponse>;
	loading: boolean;
}

export const fetchHourlyForecast = createAsyncThunk<
	IHourlyForecast,
	string,
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('hourlyForecast/fetchHourlyForecast', async (cityName, thunkAPI) => {
	const geocodingData = await geocodingService.getGeocodingDataByCityName(
		cityName
	);
	const response = await weatherService.getHourlyForecastByCoordinates(
		getCoordinates(geocodingData)
	);
	return {
		content: response,
		loading: false,
	};
});

export const hourlyForecastSlice = createSlice({
	name: 'hourlyForecast',
	initialState,
	reducers: {
		setHourlyForecast: (state, { payload }: PayloadAction<IHourlyForecast>) =>
			payload,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchHourlyForecast.pending, (state, { payload }) => {
			state.loading = true;
		});
		builder.addCase(
			fetchHourlyForecast.fulfilled,
			(state, { payload }) => payload
		);
	},
});

export const { setHourlyForecast } = hourlyForecastSlice.actions;
export const hourlyForecastSelector = (state: RootState) =>
	state.hourlyForecast.content;
export const isHourlyForecastLoaded = (state: RootState) =>
	state.hourlyForecast.loading;
export default hourlyForecastSlice.reducer;
