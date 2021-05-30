import { GET_WEEKLY_FORECAST } from "../actionTypes";

export const setWeeklyWeather = (forecast: Array<IDailyForecast>) => ({
    type: GET_WEEKLY_FORECAST,
    payload: forecast
})