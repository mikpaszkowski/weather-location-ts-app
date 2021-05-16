import * as React from "react";
import styled from "styled-components";
import ForecastDailyCard from "./ForecastDailyCard";

const WeeklyForecastWrapper = styled.div`
  position: relative;
  width: 100%;
`;

type WeeklyForecastProps = {
  weeklyForecast: Array<Object | null>;
};

const WeeklyForecast = ({ weeklyForecast }: WeeklyForecastProps) => {
  console.log(weeklyForecast);
  return (
    <WeeklyForecastWrapper>
      {weeklyForecast.map((forecast, index) => (
        <ForecastDailyCard forecast={forecast} />
      ))}
    </WeeklyForecastWrapper>
  );
};

export default WeeklyForecast;
