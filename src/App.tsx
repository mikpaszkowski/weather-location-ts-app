/* eslint-disable max-len */
import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import { device } from "./styles/responsive";
import { Navigation } from "./components/Navigation";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Lato", "sans-serif";
    color: white;
    margin: 0;
    padding: 0;
    position: relative;

    &:before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      background-image: url(${`${process.env.PUBLIC_URL}/backgrounds-svg/23-02-moon.png`});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  }

  * {
    box-sizing: border-box;
    font-size: 10px;
    margin: 0;
    padding: 0;
    font-family: "Lato", "sans-serif";

    @media ${device.tablet} {
      font-size: 9px;
    }
    @media ${device.mobileLarge} {
      font-size: 8px;
    }
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 10rem;
  position: relative;

  @media ${device.tabletLarge} {
    padding: 0 3rem;
  }

  @media ${device.mobileLarge} {
    padding: 0 1rem;
  }
`;

const App = () => {
  return (
    <>
      <Navigation />
      <AppWrapper>
        <Home />
      </AppWrapper>
      <GlobalStyle />
    </>
  );
};

export default App;
