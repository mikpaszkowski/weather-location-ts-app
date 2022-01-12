import react from 'react';
import { HeadlineSmallSVG } from "../iconComponents/HeadlineSmallSVG";
import { Link } from "react-router-dom";
import * as React from "react";
import styled from "styled-components";


const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-left: 1rem;
`;


export const Navigation = () => {
  return (
    <NavigationWrapper>
      <Link to="/home" onClick={window.location.reload} style={{
        display: "inline-block",
        position: "relative",
        zIndex: 1}}>
        <HeadlineSmallSVG staticMode svgWidth="30rem" svgHeight="10rem"/>
      </Link>
    </NavigationWrapper>
  )
}