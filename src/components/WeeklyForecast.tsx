import * as React from "react";
import styled from "styled-components";
import { ForecastDailyCard } from "./ForecastDailyCard";
import { useAppSelector } from "../hooks/storeHooks";
import { IHourlyForecast } from "../services/wetherAPI";

const HourlyForecastWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: scroll;
`;

export const WeeklyForecast = () => {
  const hourlyForecast = useAppSelector((state) => state.hourlyForecast);
  return (
    <HourlyForecastWrapper>
      {hourlyForecast.map((forecast, index) => (
        <ForecastDailyCard forecast={forecast} />
      ))}
    </HourlyForecastWrapper>
  );
};
