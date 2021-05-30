import { GET_WEEKLY_FORECAST } from "../actionTypes";


const INITIAL_STATE: WeeklyForecastState = {
    weeklyForecast: []
}

export const weeklyForecastReducer = (state: WeeklyForecastState = INITIAL_STATE, action: WeeklyForecastAction) => {
    switch(action.type){
        case GET_WEEKLY_FORECAST:
            return{
                ...state,
                weeklyForecast: action.payload
            }
        default:
            return state;
    }
}
