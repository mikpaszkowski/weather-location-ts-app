import * as React from 'react';
import { CurrentWeatherDetails } from './CurrentWeatherDetails';
import CurrentWeatherInfo from './CurrentWeatherInfo';
import { HourlyForecast } from './HourlyForecast';
import styled from 'styled-components';
import { selectForecastLoading } from '../store/forecast/forecastSlice';
import { useAppSelector } from '../hooks/storeHooks';
import { Loader } from './Loader';
import { selectSearchError } from '../store/forecast/forecastSlice';

const WeatherResultWrapper = styled.div``;

const WeatherResult = () => {
	const isForecastLoading = useAppSelector(selectForecastLoading);
	const errorOccured = useAppSelector(selectSearchError);
	return (
		<>
			{!errorOccured ? (
				<WeatherResultWrapper>
					{isForecastLoading ? (
						<Loader />
					) : (
						<>
							{<CurrentWeatherInfo />}
							<CurrentWeatherDetails />
							<HourlyForecast />
						</>
					)}
				</WeatherResultWrapper>
			) : null}
		</>
	);
};

export default WeatherResult;
