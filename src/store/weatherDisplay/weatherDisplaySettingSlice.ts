import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootStore';

export interface IWeatherDisplaySetting {
	displaySetting: 'daily' | 'hourly';
}

const initialState: IWeatherDisplaySetting = {
	displaySetting: 'daily',
};

export const weatherDisplaySettingSlice = createSlice({
	name: 'weatherDisplay',
	initialState,
	reducers: {
		toggleWeatherDisplay: (state, action: PayloadAction<void>) => {
			state.displaySetting === 'daily'
				? (state.displaySetting = 'hourly')
				: (state.displaySetting = 'daily');
		},
	}
});

export const { toggleWeatherDisplay } = weatherDisplaySettingSlice.actions;
export const selectCurrWeatherDisplaySetting = (state: RootState) =>
	state.weatherDisplaySetting;
export default weatherDisplaySettingSlice.reducer;
