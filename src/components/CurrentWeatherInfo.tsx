import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { CustomIcon } from '../iconComponents/CustomIcon';
import { useAppSelector } from '../hooks/storeHooks';
import { selectCurrentWeather } from '../store/forecast/forecastSlice';
import { ToggleWeatherButton } from './ToggleWeatherButton';
import { useDispatch } from 'react-redux';
import { toggleWeatherDisplay } from '../store/weatherDisplay/weatherDisplaySettingSlice';
import { selectCurrWeatherDisplaySetting } from '../store/weatherDisplay/weatherDisplaySettingSlice';
import { EntryViewType } from './WeatherResult';

const slideDown = keyframes`
  from{
    transfrom: translateX(0);
    opacity: 0;
  }
  to{
    transfrom: translateX(-5rem);
    opacity: 1;
  }
`;

const CurrentWeatherResultWrapper = styled.div`
	display: grid;
	flex-basis: 100%;
	position: relative;
	justify-content: center;
	align-items: center;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 0.5rem;
	margin: 12rem 0 2.5rem 0;
	padding: 0 4rem;
	width: 100%;
	border-radius: 3rem;
	transition: 0.6s 0.3s ease-in-out;
	transform: translateX(0);
	animation-name: ${slideDown};
	animation-duration: 0.5s;
	animation-delay: ${(props: EntryViewType) =>
		props.entryView ? '0.4s' : '0s'};
	animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
	animation-fill-mode: both;
	background-color: #9c9c9c78;
	backdrop-filter: blur(4px);
	will-change: transform;
`;

const DateLocationWrapper = styled.div`
	position: relative;

	& > h1 {
		font-size: 5rem;
		font-weight: 400;
		margin-bottom: 2rem;
	}

	& > span {
		display: block;
		font-size: 3.5rem;
		font-weight: 300;
	}
`;

const Temp = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	top: -1rem;
	height: 100%;

	& > span {
		display: block;
		font-size: 9rem;
		font-weight: 300;
	}
`;

const Description = styled.div`
	position: absolute;
	bottom: 4.5rem;
	left: 8rem;
	font-size: 4rem;
	font-weight: 300;
`;

const CurrentWeatherInfo = ({ entryView }: EntryViewType) => {
	const dispatch = useDispatch();
	const currentWeather = useAppSelector(selectCurrentWeather);
	const { displaySetting } = useAppSelector(selectCurrWeatherDisplaySetting);
	const { city, country, date, description, icon, temp } = currentWeather;
	const toggleWeatherSetting = () => {
		dispatch(toggleWeatherDisplay());
	};
	return (
		<CurrentWeatherResultWrapper entryView={entryView}>
			<DateLocationWrapper>
				<h1>
					{city}, {country}
				</h1>
				<span>{`${date}`}</span>
			</DateLocationWrapper>
			<CustomIcon alt="weatherIcon" src={icon} width="35rem" />
			<Temp>
				<span>{`${temp}\u00b0C`}</span>
				<Description>{description}</Description>
			</Temp>
			<ToggleWeatherButton
				onClick={toggleWeatherSetting}
				displaySetting={displaySetting}
			/>
		</CurrentWeatherResultWrapper>
	);
};

export default CurrentWeatherInfo;
