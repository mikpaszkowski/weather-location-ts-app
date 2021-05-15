import * as React from "react";
import styled from "styled-components";
import CustomIcon from "../iconComponents/CustomIcon";

const CurrentWeatherInfoWrapper = styled.div`
  background-color: rgba(255, 255, 255, 40%);
`;

const DateLocationWrapper = styled.div`
  flex-basis: 100%;

  & > h1 {
    font-size: 5rem;
    font-weight: 400;
  }

  & > span {
    font-size: 3.5rem;
    font-weight: 300;
  }
`;

type CurrWeatherProp = {
  currWeather: Object | null | any;
};

const CurrentWeatherInfo = ({ currWeather }: CurrWeatherProp) => {
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
    <CurrentWeatherInfoWrapper>
      <DateLocationWrapper>
        <h1>
          {city}, {country}
        </h1>
        <span>{`${date}`}</span>
      </DateLocationWrapper>
      <CustomIcon alt="weatherIcon" src={icon} />
    </CurrentWeatherInfoWrapper>
  );
};

export default CurrentWeatherInfo;
