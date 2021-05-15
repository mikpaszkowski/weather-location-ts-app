import * as React from "react";
import HeadlineSVG from "./iconComponents/Headline";
import HeadlineSmallSVG from "./iconComponents/HeadlineSmallSVG";
import styled, { createGlobalStyle } from "styled-components";
import SearchBar from "./components/SearchBar";
import Clock from "./components/clock";
import MessageContainer from "./components/MessageContainer";
import { getWeeklyForecastByCityName } from "./services/wetherAPI";
import { RiEmotionSadLine } from "react-icons/ri";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const [weatherInfo, setWeatherInfo] = useState({});
  const [searchFailed, setSearchFailed] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await getWeeklyForecastByCityName(searchValue);
      if (response.status === 200) {
        setWeatherInfo(response);
        setSearchFailed(false);
        console.log("weefwef");
      }
    } catch (err) {
      setSearchFailed(true);
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <HeadlineSmallSVG staticMode={true} svgWidth="30rem" svgHeight="10rem" />

      <AppWrapper>
        <Clock />
        <HeadlineSVG temporaryMode={true} staticMode={false} />
        <SearchBar
          name="searchValue"
          placeholder="Enter city"
          value={searchValue}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
        <MessageContainer
          active={searchFailed}
          message="The specified city was not found ..."
          icon={StyledNotFoundIcon}
        />
      </AppWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
