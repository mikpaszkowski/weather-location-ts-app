import * as React from "react";
import styled from "styled-components";
import { RiEmotionSadLine } from "react-icons/ri";
import WeatherResult from "../components/WeatherResult";
import { NotFound } from "../components/MessageContainer";
import { HeadlineSVG } from "../iconComponents/Headline";
import { SearchBar } from "../components/SearchBar";
import { formattedResponse } from "../utils/formatWeatherResponse";
import {
  getCurrentWeatherByCityName,
  getWeeklyForecastByCityName,
  getWeeklyForecastByCoordinates,
} from "../services/wetherAPI";
import { getCoordinatesByCityName } from "../services/geocodingAPI";
import { connect } from "react-redux";
import { setCurrentWeather } from "../store/currentWeather/actions";
import { setWeeklyWeather } from "../store/forecast/actions";

const StyledNotFoundIcon = styled(RiEmotionSadLine)`
  display: block;
  height: 5rem;
  width: 5rem;
  margin-right: 2rem;
  font-size: 5.5rem;
`;

const HomeWrapper = styled.div``;

const { useState } = React;

const Home = ({ setCurrWeather }: any) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setsearchResult] = useState<boolean | null>(null);
  const [searchError, setsearchError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const weatherResponse = await getCurrentWeatherByCityName(searchValue);
      const forecastResponse = await getWeeklyForecastByCityName(searchValue);
      const coordinates = await getCoordinatesByCityName(searchValue);
      const forecast = await getWeeklyForecastByCoordinates(coordinates);
      setsearchResult(false);
      if (weatherResponse.data && forecastResponse.data) {
        setCurrWeather(formattedResponse(weatherResponse.data));
        // setWeeklyForecast(forecast.);
        setsearchResult(true);
        setsearchError(false);
      }
    } catch (err) {
      setsearchError(true);
      console.log(err.message);
    }
  };

  return (
    <HomeWrapper>
      <HeadlineSVG
        temporaryMode={true}
        staticMode={false}
        searchResult={searchResult}
      />
      <SearchBar
        name="searchValue"
        placeholder="Enter city"
        value={searchValue}
        onSubmit={handleSubmit}
        onChange={handleChange}
        searchResult={searchResult}
      />
      <NotFound
        active={searchError}
        message="The specified city was not found ..."
        icon={StyledNotFoundIcon}
      />
      <WeatherResult searchResult={searchResult} />
    </HomeWrapper>
  );
};

const mapDispatchToProps = (
  dispatchCurrWeather: CurrWeatherDispatchType,
  dispatchWeeklyWeather: WeeklyForecastDispatchType
) => ({
  setCurrWeather: (currWeather: ICurrWeather) =>
    dispatchCurrWeather(setCurrentWeather(currWeather)),
  setWeeklyForecast: (weeklyForecast: Array<IDailyForecast>) => {
    dispatchWeeklyWeather(setWeeklyWeather(weeklyForecast));
  },
});

export default connect(mapDispatchToProps)(Home);
