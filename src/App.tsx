import * as React from "react";
import { HeadlineSmallSVG } from "./iconComponents/HeadlineSmallSVG";
import styled, { createGlobalStyle } from "styled-components";
import { Clock } from "./components/Clock";
import Home from "./pages/Home";

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
  padding: 0 10rem;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const App = () => {
  return (
    <React.Fragment>
      <HeadlineSmallSVG staticMode={true} svgWidth="30rem" svgHeight="10rem" />

      <AppWrapper>
        <Clock />
        <Home />
      </AppWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
