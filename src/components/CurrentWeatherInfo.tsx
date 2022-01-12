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
import { device } from '../styles/responsive';

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
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: center;
	align-items: center;
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
	text-align: left;
	width: 100%;
	margin-top: 2rem;
`;

const Temp = styled.div`
	display: inline;
	margin-bottom: 3rem;
	font-size: 7rem;
	font-weight: 300;

	@media ${device.tabletSmall} {
		font-size: 5rem;
	}

	@media ${device.mobileLarge} {
		font-size: 3rem;
	}
`;

const WeatherIconTempWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: 100%;

	& > img {
		width: 18rem;
	}

	@media ${device.tabletSmall} {
		justify-content: flex-start;

		& > img {
			width: 13rem;
		}
	}

	@media ${device.mobileLarge} {
		justify-content: center;

		& > img {
			width: 11rem;
		}
	}
`;

const LocationName = styled.h1`
	font-size: 4rem;
	font-weight: 400;

	@media ${device.tabletSmall} {
		font-size: 3rem;
	}
`;

const DateName = styled.span`
	display: block;
	font-size: 3rem;
	font-weight: 300;

	@media ${device.tabletSmall} {
		font-size: 2rem;
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
	const { city, country, date, icon, temp } = currentWeather;
	const toggleWeatherSetting = () => {
		dispatch(toggleWeatherDisplay());
	};
	return (
		<CurrentWeatherResultWrapper entryView={entryView}>
			<DateLocationWrapper>
				<LocationName>
					{city}, {country}
				</LocationName>
				<DateName>{`${date}`}</DateName>
			</DateLocationWrapper>
			<WeatherIconTempWrapper>
				<CustomIcon alt="weatherIcon" src={icon} />
				<Temp>{`${temp}\u00b0C`}</Temp>
			</WeatherIconTempWrapper>
		</CurrentWeatherResultWrapper>
	);
};

export default CurrentWeatherInfo;
