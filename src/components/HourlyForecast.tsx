import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { HourlyForecastCard } from './HourlyForecastCard';
import { useAppSelector } from '../hooks/storeHooks';
import { selectHourlyForecast } from '../store/forecast/forecastSlice';

const slideDown = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const HourlyForecastWrapper = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	overflow-x: scroll;
	transition: 0.6s 0.3s ease-in-out;
	transform: translateX(0);
	animation-name: ${slideDown};
	animation-duration: .5s;
	animation-delay: 0.1s;
	animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
	animation-fill-mode: both;

	&::-webkit-scrollbar {
		width: 1rem;
	}

	&::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 1rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
		border-radius: 1rem;
	}
`;

export const HourlyForecast = () => {
	const hourlyForecast = useAppSelector(selectHourlyForecast);
	return (
		<HourlyForecastWrapper>
			{hourlyForecast.map((forecast, index) => (
				<HourlyForecastCard key={index} forecast={forecast} />
			))}
		</HourlyForecastWrapper>
	);
};
