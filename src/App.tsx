import * as React from "react";
import HeadlineSVG from "./iconComponents/Headline";
import styled, { createGlobalStyle } from "styled-components";
import SearchBar from "./components/search-bar";
import Clock from "./components/clock";

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
`;

const{ useState } = React;

function App() {

  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(event.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();



  }

  return (
    <React.Fragment>
       <HeadlineSVG temporaryMode={false} staticMode={true} svgWidth="30rem" svgHeight="10rem"/>
        <Clock/>
      <AppWrapper>
        <HeadlineSVG temporaryMode={true} staticMode={false}/>
        <SearchBar name="searchValue" placeholder="Enter your city" value={searchValue} onSubmit={handleSubmit} onChange={handleChange}/>
      </AppWrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
