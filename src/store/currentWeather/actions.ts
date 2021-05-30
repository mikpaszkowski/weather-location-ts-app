import { GET_CURRENT_WEATHER } from "../actionTypes";

export const setCurrentWeather = (currWeather: ICurrWeather)  => ({
    type: GET_CURRENT_WEATHER,
    payload: currWeather
})