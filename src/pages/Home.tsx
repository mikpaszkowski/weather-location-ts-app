import * as React from 'react';
import styled from 'styled-components';
import { RiEmotionSadLine } from 'react-icons/ri';
import WeatherResult from '../components/WeatherResult';
import { NotFound } from '../components/MessageContainer';
import { HeadlineSVG } from '../iconComponents/Headline';
import { SearchBar } from '../components/SearchBar';
import { useDispatch } from 'react-redux';
import { fetchCurrWeather } from '../store/currentWeather/currentWeatherSlice';
import { fetchHourlyForecast } from '../store/hourlyForecast/hourlyForecastSlice';
import { fetchDailyForecast } from '../store/dailyForecast/dailyForecastSlice';

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
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchResult, setsearchResult] = useState<boolean | null>(null);
	const [searchError, setsearchError] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			dispatch(fetchDailyForecast(searchValue));
			dispatch(fetchHourlyForecast(searchValue));
			dispatch(fetchCurrWeather(searchValue));
			setsearchResult(false);
			if (true) {
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
