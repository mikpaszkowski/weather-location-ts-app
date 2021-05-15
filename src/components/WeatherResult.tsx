import * as React from "react";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import CurrentWeatherInfo from "./CurrentWeatherInfo";
import WeeklyForecast from "./WeeklyForecast";
import styled from "styled-components";
import { formatWeatherJSONResponse } from "../utils/formatWeatherJSONResponse";

const WeatherResultWrapper = styled.div``;

type WeatherResultProp = {
  currWeatherInfo: Object | null;
  searchResult: Object | null;
};

const { useEffect, useState } = React;

const WeatherResult = ({
  currWeatherInfo,
  searchResult,
}: WeatherResultProp) => {
  const [currWeather, setCurrWeather] = useState({});

  useEffect(() => {
    if (searchResult) {
      setCurrWeather(formatWeatherJSONResponse(currWeatherInfo));
    }
    return;
  }, [searchResult]);

  return (
    <WeatherResultWrapper>
      {searchResult ? (
        <>
          <CurrentWeatherInfo currWeather={currWeather} />
          <CurrentWeatherDetails />
          <WeeklyForecast />
        </>
      ) : null}
    </WeatherResultWrapper>
  );
};

export default WeatherResult;
