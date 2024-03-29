import * as React from "react";
import CurrentWeatherInfo, { slideIn } from "./CurrentWeatherInfo";
import { HourlyForecast } from "./HourlyForecast";
import styled from "styled-components";
import { useAppSelector } from "../hooks/storeHooks";
import { Loader } from "./Loader";
import { selectSearchError } from "../store/forecast/forecastSlice";
import { DailyForecast } from "./DailyForecast";
import { selectCurrWeatherDisplaySetting } from "../store/weatherDisplay/weatherDisplaySettingSlice";
import { selectIsLoading } from "../store/search/searchSlice";
import { ToggleWeatherButton } from "./ToggleWeatherButton";
import { TodayForecast } from "./TodayForecast";

const WeatherResultWrapper = styled.div`ó
`;

export type EntryViewType = { entryView: boolean };

type DisplaySettingMap = {
  [key: string]: JSX.Element
}

const displaySettingsMap: DisplaySettingMap = {
  "hourly": <HourlyForecast />,
  "daily": <DailyForecast />,
  "today": <TodayForecast />
};

const WeatherResult = ({ entryView }: EntryViewType) => {
  const isLoading = useAppSelector(selectIsLoading);
  const errorOccured = useAppSelector(selectSearchError);
  const { displaySetting } = useAppSelector(selectCurrWeatherDisplaySetting);

  return (
    <>
      {!errorOccured ? (
        <WeatherResultWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {<CurrentWeatherInfo entryView={entryView} />}
              <ToggleWeatherButton />
              {displaySettingsMap[displaySetting]}
            </>
          )}
        </WeatherResultWrapper>
      ) : null}
    </>
  );
};

export default WeatherResult;
