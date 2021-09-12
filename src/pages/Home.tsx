import * as React from 'react';
import styled from 'styled-components';
import { RiEmotionSadLine } from 'react-icons/ri';
import WeatherResult from '../components/WeatherResult';
import { NotFound } from '../components/MessageContainer';
import { HeadlineSVG } from '../iconComponents/Headline';
import { SearchBar } from '../components/SearchBar';
import weatherService from '../services/api/wetherAPI';
import { getGeocodingDataByCityName } from '../services/api/reverseAndForwardGeocodingAPI';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentWeather,
	fetchCurrWeather,
} from '../store/currentWeather/currentWeatherSlice';
import {
	setHourlyForecast,
	hourlyForecastSelector,
} from '../store/hourlyForecast/hourlyForecastSlice';
import { setDailyForecast } from '../store/dailyForecast/dailyForecastSlice';
import { useAppSelector, useAppDispatch } from '../hooks/storeHooks';
import { getCoordinates } from '../utils/coordinates';

const StyledNotFoundIcon = styled(RiEmotionSadLine)`
	display: block;
	height: 5rem;
	width: 5rem;
	margin-right: 2rem;
	font-size: 5.5rem;
`;

const HomeWrapper = styled.div``;

const { useState } = React;

const Home = () => {
	const dispatch = useDispatch();
	const getCurrWeather = useAppSelector(selectCurrentWeather);
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchResult, setsearchResult] = useState<boolean | null>(null);
	const [searchError, setsearchError] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			// const weatherResponse = await getCurrentWeatherByCityName(searchValue);
			const geocodingData = await getGeocodingDataByCityName(searchValue);
			console.log(geocodingData);
			const forecastResponse =
				await weatherService.getHourlyForecastByCoordinates(
					getCoordinates(geocodingData)
				);
			const dailyForecast = await weatherService.getDailyForecastByCoordinates(
				getCoordinates(geocodingData)
			);
			dispatch(fetchCurrWeather(searchValue));
			setsearchResult(false);
			if (forecastResponse) {
				dispatch(setHourlyForecast(forecastResponse));
				dispatch(setDailyForecast(dailyForecast));
				setsearchError(false);
				setsearchResult(true);
			}
		} catch (err) {
			setsearchError(true);
			setsearchResult(false);
			console.log(err);
		}
	};

	return (
		<HomeWrapper>
			<HeadlineSVG
				temporaryMode={true}
				staticMode={false}
				searchResult={searchResult}
			/>
			<SearchBar
				name="searchValue"
				placeholder="Enter city"
				value={searchValue}
				onSubmit={handleSubmit}
				onChange={handleChange}
				searchResult={searchResult}
			/>
			<NotFound
				active={searchError}
				message="The specified city was not found ..."
				icon={StyledNotFoundIcon}
			/>
			<WeatherResult searchResult={searchResult} />
		</HomeWrapper>
	);
};

export default Home;
