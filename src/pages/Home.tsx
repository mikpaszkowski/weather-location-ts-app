import * as React from 'react';
import styled from 'styled-components';
import { RiEmotionSadLine } from 'react-icons/ri';
import WeatherResult from '../components/WeatherResult';
import { NotFound } from '../components/MessageContainer';
import { HeadlineSVG } from '../iconComponents/Headline';
import { SearchBar } from '../components/SearchBar';
import { fetchForecast } from '../store/forecast/forecastSlice';
import { useThunkAppDispatch } from '../hooks/storeHooks';
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
	const dispatch = useThunkAppDispatch();
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchResult, setsearchResult] = useState<boolean | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(fetchForecast(searchValue))
			.then(() => {
				setsearchResult(true);
			})
			.catch((err) => {
				setsearchResult(false);
				console.log(err);
			});
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
				message="The specified city was not found ..."
				icon={StyledNotFoundIcon}
			/>
			{searchResult ? <WeatherResult /> : null}
		</HomeWrapper>
	);
};

export default Home;
