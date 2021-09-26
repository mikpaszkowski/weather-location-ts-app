import * as React from 'react';
import styled from 'styled-components';
import { CustomIcon } from '../iconComponents/CustomIcon';
import { IDailyFormattedForecastResponse } from '../services/api/wetherAPI';
import { RaindropPercentage } from './RaindropPercentage';

const DailyForecastCardWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 4rem;
	margin: 1rem 0;
	border-radius: 2rem;
	width: 100%;
	background-color: #616161c0;
	backdrop-filter: blur(5px);
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #272727;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
			rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
			rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
	}
`;

const InfoGraphic = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Date = styled.p`
	font-size: 2.5rem;
`;

const DayAndNightWeatherImage = styled.div`
	margin-left: 2rem;
`;

const Temperature = styled.p`
	font-size: 2.5rem;
`;

export type DailyForecastDataType = {
	data: IDailyFormattedForecastResponse;
};

export const DailyForecastCard = (data: IDailyFormattedForecastResponse) => {
	const dayIcon: string = data.weather[0].icon;
	return (
		<DailyForecastCardWrapper>
			<Date>{data.date}</Date>
			<InfoGraphic>
				<RaindropPercentage width="5rem" percipitation={data.precipitation} />
				<DayAndNightWeatherImage>
					<CustomIcon alt="dayicon" width="7rem" src={dayIcon} />
					<CustomIcon
						alt="nighticon"
						width="7rem"
						src={dayIcon.replaceAll('d', 'n')}
					/>
				</DayAndNightWeatherImage>
			</InfoGraphic>
			<Temperature>{`${data.temp.day}\u00b0C/${data.temp.night}\u00b0C`}</Temperature>
		</DailyForecastCardWrapper>
	);
};
