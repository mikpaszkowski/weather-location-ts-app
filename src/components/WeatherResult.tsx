import * as React from 'react';
import { CurrentWeatherDetails } from './CurrentWeatherDetails';
import CurrentWeatherInfo from './CurrentWeatherInfo';
import { HourlyForecast } from './HourlyForecast';
import styled from 'styled-components';
import { selectForecastLoading } from '../store/forecast/forecastSlice';
import { useAppSelector } from '../hooks/storeHooks';
import { Loader } from './Loader';
import { selectSearchError } from '../store/forecast/forecastSlice';
import { DailyForecast } from './DailyForecast';
import { selectCurrWeatherDisplaySetting } from '../store/weatherDisplay/weatherDisplaySettingSlice';

const WeatherResultWrapper = styled.div``;

export type EntryViewType = { entryView: boolean };

const WeatherResult = ({ entryView }: EntryViewType) => {
	const isForecastLoading = useAppSelector(selectForecastLoading);
	const errorOccured = useAppSelector(selectSearchError);
	const weatherDisplaySetting = useAppSelector(selectCurrWeatherDisplaySetting);
	return (
		<>
			{!errorOccured ? (
				<WeatherResultWrapper>
					{isForecastLoading ? (
						<Loader />
					) : (
						<>
							{<CurrentWeatherInfo entryView={entryView} />}
							<CurrentWeatherDetails />
							{weatherDisplaySetting.displaySetting === 'hourly' ? (
								<HourlyForecast />
							) : (
								<DailyForecast />
							)}
						</>
					)}
				</WeatherResultWrapper>
			) : null}
		</>
	);
};

export default WeatherResult;
