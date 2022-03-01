import * as React from "react";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { HourlyForecastCard } from "./HourlyForecastCard";
import { useAppSelector } from "../hooks/storeHooks";
import { selectHourlyForecast } from "../store/forecast/forecastSlice";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useWindowSize } from "../hooks/useWindowSize";

const slideDown = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HourlyForecastWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 4rem;
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

type HourlyChartData = {
  temperature: number,
  hour: string
}

const ChartWrapper = styled.div`
  position: relative;
  background-color: #272727e3;
  border-radius: 1rem;
  padding-top: 3rem;
  padding-right: 1rem;
  padding-bottom: 3rem;
`;

const LabelY = styled.span`
  position: absolute;
  font-size: 1.7rem;
  transform: rotate(-90deg);
  left: -1.5rem;
  top: 50%
`;

const LabelX = styled.span`
  position: absolute;
  font-size: 1.7rem;
  bottom: 1.5rem;
  left: 50%
`;

type Interval = "preserveStart" | "preserveEnd" | "preserveStartEnd" | number;


export const HourlyForecast = () => {
  const hourlyForecast = useAppSelector(selectHourlyForecast);
  const [interval, setInterval] = useState<Interval>("preserveEnd");
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 660 && windowSize.width > 0) {
      setInterval(10);
    }
  }, [windowSize]);

  const chartData: HourlyChartData[] = hourlyForecast.map(e => {
    return {
      temperature: e.temperature,
      hour: e.hour
    };
  });

  return (
    <>
      <ChartWrapper>
        <LabelY>Temperature</LabelY>
        <LabelX>Time</LabelX>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData as any[]}>
            <CartesianGrid strokeDasharray="3 3" strokeWidth={1} />
            <XAxis dataKey="hour" stroke="#ffffff" interval={interval} />
            <YAxis stroke="#ffffff" />
            <Line type="monotone" dataKey="temperature" stroke="#90f2bc" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
      <HourlyForecastWrapper>
        {hourlyForecast.map((forecast, index) => (
          <HourlyForecastCard key={index} forecast={forecast} />
        ))}

      </HourlyForecastWrapper>
    </>
  );
};
