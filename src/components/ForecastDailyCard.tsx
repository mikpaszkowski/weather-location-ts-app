import * as React from "react";
import styled, { keyframes } from "styled-components";
import { IHourlyForecast } from "../services/wetherAPI";
import { CustomIcon } from "../iconComponents/CustomIcon";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 2rem 3rem;
  margin: 1rem;
  background-color: rgba(255, 255, 255, 30%);
  backdrop-filter: blur(4px);
  text-align: center;
  border-radius: 1.5rem;
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

const RaindropPercentage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Percipitation = styled.span`
  font-size: 1.8rem;
  padding: 1rem 0 1rem 0;
`;

type Props = {
  forecast: IHourlyForecast;
};

export const ForecastDailyCard = ({ forecast }: Props): JSX.Element => {
  return (
    <CardWrapper>
      <Hour>{forecast.hour}</Hour>
      <CustomIcon src={forecast.icon} alt="weather-icon" />{" "}
      <Temp>
        <span>{forecast.temperature}</span>
        <CustomIcon alt="weatherIcon" src="celsius" width="3rem" />
      </Temp>
      <RaindropPercentage>
        <CustomIcon alt="weatherIcon" src="raindrop" width="4.5rem" />
        <Percipitation>{`${forecast.precipitation}%`}</Percipitation>
      </RaindropPercentage>
    </CardWrapper>
  );
};
