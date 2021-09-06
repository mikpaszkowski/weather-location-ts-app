import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../rootStore';
import { ICurrWeatherResponseContent } from '../../utils/formatWeatherResponse';

export interface IGeoLocation {
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  county: string;
  administrative_area: string;
  country: string;
  country_code: string;
  continent: string;
}

export const initialState: IGeoLocation = {
  latitude: 0,
  longitude: 0,
  name: '',
  region: '',
  county: '',
  administrative_area: '',
  country: '',
  country_code: '',
  continent: '',
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setGeolocation: (state, { payload }: PayloadAction<IGeoLocation>) =>
      payload,
  },
});

export const { setGeolocation } = geolocationSlice.actions;
export const selectGeoLocation = (state: RootState) => state.geoLocation;
export default geolocationSlice.reducer;
