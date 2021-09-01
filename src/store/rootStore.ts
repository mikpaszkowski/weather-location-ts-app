import { configureStore, applyMiddleware, Store, Action } from "@reduxjs/toolkit";
import logger from "redux-logger"
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { currWeatherReducer } from "./currentWeather/currWeatherReducer";

const middlewares = [logger, thunk];

const store = configureStore({
    reducer: {
        currWeather: currWeatherReducer
    },
    middleware: middlewares
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;

