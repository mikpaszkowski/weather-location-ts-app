import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { currentWeatherReducer } from "./currentWeather/reducer";
import { weeklyForecastReducer } from "./forecast/reducer"


const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["extras"]
}

const rootReducer = combineReducers({
    currWeather: currentWeatherReducer,
    weeklyForecast: weeklyForecastReducer
});


export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(persistConfig, rootReducer)