import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import currWeatherReducer from './currentWeather/currentWeatherSlice';
import geoLocationReducer from './geoLocation/geoLocationSlice';
import hourlyForecastReducer from './hourlyForecast/hourlyForecastSlice';
import dailyForecastReducer from './dailyForecast/dailyForecastSlice';

const middlewares = [logger, thunk];

export const store = configureStore({
	reducer: {
		currWeather: currWeatherReducer,
		geoLocation: geoLocationReducer,
		hourlyForecast: hourlyForecastReducer,
		dailyForecast: dailyForecastReducer,
	},
	middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
