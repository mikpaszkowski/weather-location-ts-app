import {
  configureStore,
  applyMiddleware,
  Store,
  Action,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import currWeatherReducer from './currentWeather/currentWeatherSlice';
import geoLocationReducer from './geoLocation/geoLocationSlice';
import hourlyForecastReducer from './hourlyForecast/hourlyForecastSlice';

const middlewares = [logger];

export const store = configureStore({
  reducer: {
    currWeather: currWeatherReducer,
    geoLocation: geoLocationReducer,
    hourlyForecast: hourlyForecastReducer,
  },
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
