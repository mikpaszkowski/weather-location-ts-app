import { GET_CURRENT_WEATHER } from "../actionTypes";

export const getCurrentWeather = (currWeather: ICurrWeather)  => ({
    type: GET_CURRENT_WEATHER,
    payload: currWeather
})