import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootStore';

export interface IWeatherDisplaySetting {
	displaySetting: 'daily' | 'hourly' | 'today';
}

const initialState: IWeatherDisplaySetting = {
	displaySetting: 'today',
};

export const weatherDisplaySettingSlice = createSlice({
	name: 'weatherDisplay',
	initialState,
	reducers: {
		toggleWeatherDisplay: (state, action: PayloadAction<IWeatherDisplaySetting>) => {
			state.displaySetting = action.payload.displaySetting
		},
	}
});

export const { toggleWeatherDisplay } = weatherDisplaySettingSlice.actions;
export const selectCurrWeatherDisplaySetting = (state: RootState) =>
	state.weatherDisplaySetting;
export default weatherDisplaySettingSlice.reducer;
