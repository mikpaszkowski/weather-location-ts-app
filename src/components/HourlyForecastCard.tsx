import * as React from 'react';
import styled from 'styled-components';
import { IHourlyForecastResponse } from '../services/api/wetherAPI';
import { CustomIcon } from '../iconComponents/CustomIcon';
import { RaindropPercentage } from './RaindropPercentage';

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	padding: 2rem 3rem;
	margin: 1rem;
	background-color: #616161c0;
	backdrop-filter: blur(4px);
	text-align: center;
	border-radius: 1.5rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #272727;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
			rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
			rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
	}
`;

const Temp = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: right;
	align-items: center;
	text-align: center;
	top: -0.5rem;
	margin-right: 1rem;
	height: 100%;

	& > span {
		display: block;
		font-size: 2.7rem;
		font-weight: 500;
	}
`;

const Hour = styled.span`
	font-size: 2.1rem;
	font-weight: 400;
`;

type Props = {
	forecast: IHourlyForecastResponse;
};

export const HourlyForecastCard = ({ forecast }: Props): JSX.Element => {
	return (
		<CardWrapper>
			<Hour>{forecast.hour}</Hour>
			<CustomIcon src={forecast.icon} alt="weather-icon" />{' '}
			<Temp>
				<span>{`${forecast.temperature}\u00b0C`}</span>
			</Temp>
			<RaindropPercentage
				width="4.5rem"
				percipitation={forecast.precipitation}
			/>
		</CardWrapper>
	);
};
