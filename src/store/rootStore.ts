import { configureStore, applyMiddleware, Store, Action } from "@reduxjs/toolkit";
import logger from "redux-logger"
import currWeatherReducer from "./currentWeather/currentWeatherSlice";

const middlewares = [logger];

export const store = configureStore({
    reducer: {
        currWeather: currWeatherReducer
    },
    middleware: middlewares
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;


