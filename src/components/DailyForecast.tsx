import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { selectDailyForecast } from '../store/forecast/forecastSlice';
import { useAppSelector } from '../hooks/storeHooks';
import { DailyForecastCard } from './DailyForecastCard';

const slideDown = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const DailyForecastWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	transition: 0.6s 0.3s ease-in-out;
	transform: translateX(0);
	animation-name: ${slideDown};
	animation-duration: 0.5s;
	animation-delay: 0.4s;
	animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
	animation-fill-mode: both;
	will-change: transform;
`;

export const DailyForecast = () => {
	const dailyForecast = useAppSelector(selectDailyForecast);
	return (
		<DailyForecastWrapper>
			{dailyForecast.map((forecast, index) => (
				<DailyForecastCard key={index} {...forecast} />
			))}
		</DailyForecastWrapper>
	);
};
