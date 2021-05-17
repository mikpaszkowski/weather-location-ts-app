import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import CustomIcon from "../iconComponents/CustomIcon";

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
  display: grid;
  flex-basis: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin-top: 13rem;
  padding: 0 4rem;
  width: 100%;
  border-radius: 3rem;
  transition: 0.6s 0.3s ease-in-out;
  transform: translateX(0);
  animation-name: ${slideDown};
  animation-duration: 1s;
  animation-delay: 0.4s;
  animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
  animation-fill-mode: both;
  background-color: rgba(255, 255, 255, 30%);
  will-change: transform;
`;

const DateLocationWrapper = styled.div`
  position: relative;

  & > h1 {
    font-size: 5rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }

  & > span {
    display: block;
    font-size: 3.5rem;
    font-weight: 300;
  }
`;

const Temp = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: -1rem;
  height: 100%;

  & > span {
    display: block;
    font-size: 9rem;
    font-weight: 300;
  }
`;

const Description = styled.div`
  position: absolute;
  bottom: 4.5rem;
  left: 8rem;
  font-size: 4rem;
  font-weight: 300;
`;

type CurrWeatherProp = {
  currWeather: Object | null | any;
};

export const CurrentWeatherInfo = ({ currWeather }: CurrWeatherProp) => {
  const {
    city,
    country,
    date,
    lat,
    lon,
    hiumidity,
    pressure,
    temp,
    tempMax,
    tempMin,
    sunrise,
    sunset,
    description,
    icon,
    windSpeed,
    clouds,
  } = currWeather;

  return (
    <CurrentWeatherResultWrapper>
      <DateLocationWrapper>
        <h1>
          {city}, {country}
        </h1>
        <span>{`${date}`}</span>
      </DateLocationWrapper>
      <CustomIcon alt="weatherIcon" src={icon} width="35rem" />
      <Temp>
        <span>{temp}</span>
        <CustomIcon alt="weatherIcon" src="celsius" width="9rem" />
        <Description>{description}</Description>
      </Temp>
    </CurrentWeatherResultWrapper>
  );
};
