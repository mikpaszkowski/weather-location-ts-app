import * as React from "react";
import { CurrentWeatherDetails } from "./CurrentWeatherDetails";
import { CurrentWeatherInfo } from "./CurrentWeatherInfo";
import { WeeklyForecast } from "./WeeklyForecast";
import styled from "styled-components";
import { formattedResponse } from "../utils/formatWeatherResponse";

const WeatherResultWrapper = styled.div``;

type WeatherResultProp = {
  currWeatherInfo: Object | null;
  searchResult: Object | null;
  weeklyForecastInfo: Array<Object | null>;
};

const { useEffect, useState } = React;

const WeatherResult = ({
  currWeatherInfo,
  weeklyForecastInfo,
  searchResult,
}: WeatherResultProp) => {
  const [currWeather, setCurrWeather] = useState({});
  const [weeklyForecast, setweeklyForecast] = useState<Array<Object | null>>(
    []
  );

  useEffect(() => {
    if (searchResult) {
      setCurrWeather(formattedResponse(currWeatherInfo));
      setweeklyForecast(weeklyForecastInfo);
    }
    return;
  }, [searchResult]);

  return (
    <WeatherResultWrapper>
      {searchResult ? (
        <>
          <CurrentWeatherInfo currWeather={currWeather} />
          <CurrentWeatherDetails />
          <WeeklyForecast weeklyForecast={weeklyForecast} />
        </>
      ) : null}
    </WeatherResultWrapper>
  );
};

export default WeatherResult;
