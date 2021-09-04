import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHourlyForecast } from "../../services/wetherAPI";
import { RootState } from "../rootStore";


const initialState: Array<IHourlyForecast> = [
    {
        icon: "",
        hour: "",
        temperature: 0,
        precipitation: 0
    }
]

export const hourlyForecastSlice = createSlice({
    name: "hourlyForecast",
    initialState,
    reducers: {
        setHourlyForecast: (state, { payload }: PayloadAction<Array<IHourlyForecast>>) => payload
    }
})

export const { setHourlyForecast } = hourlyForecastSlice.actions
export const hourlyForecastSelector = (state: RootState) => state.hourlyForecast
export default hourlyForecastSlice.reducer

