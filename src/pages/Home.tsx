import * as React from "react";
import styled from "styled-components";
import { RiEmotionSadLine } from "react-icons/ri";
import WeatherResult from "../components/WeatherResult";
import { NotFound } from "../components/MessageContainer";
import { HeadlineSVG } from "../iconComponents/Headline";
import { SearchBar } from "../components/SearchBar";
import { fetchForecast } from "../store/forecast/forecastSlice";
import { useAppDispatch, useAppSelector, useThunkAppDispatch } from "../hooks/storeHooks";
import { selectSearchRunning, setSearchInfo } from "../store/search/searchSlice";

const StyledNotFoundIcon = styled(RiEmotionSadLine)`
  display: block;
  height: 5rem;
  width: 5rem;
  margin-right: 2rem;
  font-size: 5.5rem;
`;

const HomeWrapper = styled.div``;

const { useState } = React;

const Home = () => {
  const dispatchThunk = useThunkAppDispatch();
  const dispatch = useAppDispatch();
  const searchResult = useAppSelector(selectSearchRunning);
  const [searchValue, setSearchValue] = useState<string>("");
  const [entryView, setEntryView] = useState<boolean>(true);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    dispatch(setSearchInfo({ isLoading: true, searchAnimation: true, errorMessage: "" }));
    e.preventDefault();
    dispatchThunk(fetchForecast(searchValue))
      .then(() => {
        dispatch(setSearchInfo({ isLoading: false, searchAnimation: true, errorMessage: "" }));
      })
      .catch((err) => {
        dispatch(setSearchInfo({ isLoading: false, searchAnimation: false, errorMessage: err }));
      });
  };

  return (
    <HomeWrapper>
        <HeadlineSVG
          temporaryMode={true}
          staticMode={false}
          searchResult={searchResult}
          svgWidth="100%"
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
        message="The specified city was not found ..."
        icon={StyledNotFoundIcon}
      />
      {searchResult ? <WeatherResult entryView={entryView} /> : null}
    </HomeWrapper>
  );
};

export default Home;
