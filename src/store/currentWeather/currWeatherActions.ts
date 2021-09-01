import { createAction } from "@reduxjs/toolkit";
import { ICurrWeatherResponse } from "../../utils/formatWeatherResponse";

const set = createAction<ICurrWeatherResponse | null>('currWeather/set')
