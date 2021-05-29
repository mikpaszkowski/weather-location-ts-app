import { GET_CURRENT_WEATHER } from "../actionTypes";

const INITIAL_STATE = {
  currWeather: null,
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
