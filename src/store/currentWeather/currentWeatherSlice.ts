import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../rootStore";
import {  ICurrWeatherResponseContent } from "../../utils/formatWeatherResponse";

export const initialState: ICurrWeatherResponseContent = {
    city: "",
    date: "",
    country: "",
    lat: 0,
    lon: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    sunrise: 0,
    sunset: 0,
    description: "",
    icon: "",
    windSpeed: 0,
    clouds: 0
}

export const currWeatherSlice = createSlice({
    name: "currWeather", 
    initialState,
    reducers: {
        set: (state, { payload }: PayloadAction<ICurrWeatherResponseContent>) => payload
    }
})

export const { set } = currWeatherSlice.actions
export const selectCurrentWeather = (state: RootState) => state.currWeather
export default currWeatherSlice.reducer