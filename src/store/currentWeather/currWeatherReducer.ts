import { createAction, createReducer } from "@reduxjs/toolkit";
import { ICurrWeatherResponse, ICurrWeatherResponseContent } from "../../utils/formatWeatherResponse";

const set = createAction<ICurrWeatherResponse | null>('currWeather/set');

const initialState = { currWeatherData: null } as ICurrWeatherResponse;

export const currWeatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(set, (state, action) => {
        state.currWeatherData = action.payload
    })
});
