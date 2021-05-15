import * as React from "react";
import HeadlineSVG from "./iconComponents/Headline";
import HeadlineSmallSVG from "./iconComponents/HeadlineSmallSVG";
import styled, { createGlobalStyle } from "styled-components";
import SearchBar from "./components/SearchBar";
import Clock from "./components/clock";
import MessageContainer from "./components/MessageContainer";
import { getCurrentWeatherByCityName } from "./services/wetherAPI";
import { RiEmotionSadLine } from "react-icons/ri";
import WeatherResult from "./components/WeatherResult";

const GlobalStyle = createGlobalStyle`
    body{
    font-family: "Lato", "sans-serif";
    color: white;
    margin: 0;
    padding: 0;
    position: relative;

    &:before{
      content: "";
      position:fixed;
      top: 0;
      left: 0;
      z-index: -1;
      background-image: url("${process.env.PUBLIC_URL}/backgrounds-svg/night_blue_sky_lake.svg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%; 
    }
  }
  *{
    box-sizing: border-box;
    font-size: 10px;
    margin: 0;
    padding: 0;
    font-family: "Lato", "sans-serif";
  }
`;

const AppWrapper = styled.div`
  display: block;
  max-width: 150rem;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const StyledNotFoundIcon = styled(RiEmotionSadLine)`
  display: block;
  height: 5rem;
  width: 5rem;
  margin-right: 2rem;
  font-size: 5.5rem;
`;

const { useState } = React;

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currWeatherInfo, setcurrWeatherInfo] = useState(null);
  const [searchResult, setsearchResult] = useState<boolean | null>(null);
  const [searchError, setsearchError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await getCurrentWeatherByCityName(searchValue);
      if (response.status === 200) {
        setcurrWeatherInfo(response.data);
        setsearchResult(true);
        setsearchError(false);
        console.log(response.data);
      }
    } catch (err) {
      setsearchError(true);
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <HeadlineSmallSVG staticMode={true} svgWidth="30rem" svgHeight="10rem" />

      <AppWrapper>
        <Clock />
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
        <MessageContainer
          active={searchError}
          message="The specified city was not found ..."
          icon={StyledNotFoundIcon}
        />
        <WeatherResult
          currWeatherInfo={currWeatherInfo}
          searchResult={searchResult}
        />
      </AppWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
