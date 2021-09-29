/* eslint-disable max-len */
import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { HeadlineSmallSVG } from './iconComponents/HeadlineSmallSVG';
import Home from './pages/Home';
import { Clock } from './components/clock';
import { device } from './styles/responsive';

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
      background-image: url("${process.env.PUBLIC_URL}/backgrounds-svg/23-02-moon.png");
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

  @media ${device.tablet} {
    font-size: 9px;
	}
  @media ${device.mobileLarge} {
    font-size: 8px;
	}
  }
`;

const AppWrapper = styled.div`
	display: block;
	max-width: 120rem;
	margin: 0 auto;
	padding: 0 10rem;
	height: 100vh;
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
			<HeadlineSmallSVG staticMode svgWidth="30rem" svgHeight="10rem" />

			<AppWrapper>
				{/* <Clock /> */}
				<Home />
			</AppWrapper>
			<GlobalStyle />
		</>
	);
};

export default App;
