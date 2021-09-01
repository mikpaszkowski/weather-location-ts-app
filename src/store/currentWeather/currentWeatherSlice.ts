import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../rootStore";
import { ICurrWeatherResponse, ICurrWeatherResponseContent } from "../../utils/formatWeatherResponse";

export const initialState: ICurrWeatherResponse = {
  currWeatherData: null
}

export const currWeatherSlice = createSlice({
    name: "currWeather",
    initialState,
    reducers: {
        set: (state, { payload }: PayloadAction<ICurrWeatherResponse>) =>{
            state.currWeatherData = payload.currWeatherData
        }
    }
})

export const { set } = currWeatherSlice.actions
export default currWeatherSlice.reducer