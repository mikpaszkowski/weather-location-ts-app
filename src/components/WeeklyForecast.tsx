import * as React from "react";
import styled from "styled-components";
import { ForecastDailyCard } from "./ForecastDailyCard";

const WeeklyForecastWrapper = styled.div`
  position: relative;
  width: 100%;
`;

type WeeklyForecastProps = {
  weeklyForecast: Array<Object | null>;
};

export const WeeklyForecast = ({ weeklyForecast }: WeeklyForecastProps) => {
  return (
    <WeeklyForecastWrapper>
      {weeklyForecast.map((forecast, index) => (
        <ForecastDailyCard key={index} forecast={forecast} />
      ))}
    </WeeklyForecastWrapper>
  );
};
