import React from "react";
import HeadlineSVG from "./iconComponents/Headline";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
    font-family: "Lato", "sans-serif";
    color: white;
    margin: 0;
    padding: 2rem 0;
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
`;

function App() {
  return (
    <React.Fragment>
       <HeadlineSVG temporaryMode={false} staticMode={true} svgWidth="30rem" svgHeight="10rem"/>
      <AppWrapper>
        <HeadlineSVG temporaryMode={true} staticMode={false}/>
      </AppWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
