import { GET_CURRENT_WEATHER } from "../actionTypes";

const INITIAL_STATE: CurrWeatherState = {
  currWeather: {
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
    sunrise: "",
    sunset: "",
    description: "",
    icon: "",
    windSpeed: 0,
    clouds: ""
  },
};

export const currentWeatherReducer = (
  state: CurrWeatherState = INITIAL_STATE,
  action: CurrWeatherAction
) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER:
      return {
          ...state,
          currWeather: action.payload
      };

    default:
      return state;
  }
};
