import { configureStore, Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import currWeatherReducer from './forecast/forecastSlice';
import geoLocationReducer from './geoLocation/geoLocationSlice';

const middlewares = [logger, thunk];

export const store = configureStore({
	reducer: {
		forecast: currWeatherReducer,
		geoLocation: geoLocationReducer,
	},
	middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
