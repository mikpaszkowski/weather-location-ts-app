import * as React from 'react';
import { CurrentWeatherDetails } from './CurrentWeatherDetails';
import CurrentWeatherInfo from './CurrentWeatherInfo';
import { HourlyForecast } from './HourlyForecast';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/storeHooks';
import { Loader } from './Loader';
import { selectSearchError } from '../store/forecast/forecastSlice';
import { DailyForecast } from './DailyForecast';
import {
	selectCurrWeatherDisplaySetting,
	toggleWeatherDisplay
} from "../store/weatherDisplay/weatherDisplaySettingSlice";
import { selectIsLoading } from "../store/search/searchSlice";
import { useDispatch } from "react-redux";
import { ToggleWeatherButton } from "./ToggleWeatherButton";

const WeatherResultWrapper = styled.div``;

export type EntryViewType = { entryView: boolean };

const WeatherResult = ({ entryView }: EntryViewType) => {
	const dispatch = useDispatch();
	const isLoading = useAppSelector(selectIsLoading);
	const errorOccured = useAppSelector(selectSearchError);
	const { displaySetting } = useAppSelector(selectCurrWeatherDisplaySetting);
	const toggleWeatherSetting = () => {
		dispatch(toggleWeatherDisplay());
	};
	return (
		<>
			{!errorOccured ? (
				<WeatherResultWrapper>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{<CurrentWeatherInfo entryView={entryView} />}
							<ToggleWeatherButton
								onClick={toggleWeatherSetting}
								displaySetting={displaySetting}
							/>
							{displaySetting === 'hourly' ? (
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
