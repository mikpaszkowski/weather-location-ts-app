import { CustomIcon } from "../iconComponents/CustomIcon";
import * as React from "react";
import styled from "styled-components";
import { device } from "../styles/responsive";

const WeatherIconTempWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 1em;
  width: 100%;

  & > img {
    width: ${(props: WeatherIconTempWrapperSize) => props.small ? "14em" : "17em"};
  }

  @media ${device.tablet} {
    justify-content: flex-start;

    & > img {
      width: ${(props: WeatherIconTempWrapperSize) => props.small ? "9em" : "13em"};
    }
  }

  @media ${device.mobileLarge} {
    
    & > img {
      width: ${(props: WeatherIconTempWrapperSize) => props.small ? "7em" : "6em"};
    }
  }
`;

const Temp = styled.span`
  display: inline;
  margin-bottom: ${(props: WeatherGraphicProps) => props.isMargin ? '3rem' : '0' };
  font-size: 9em;
  font-weight: 300;

  @media ${device.tablet} {
    font-size: 8em;
    margin-bottom: 2rem
  }

  @media ${device.mobileLarge} {
    font-size: 5em;
    margin-bottom: 1rem;
  }
`;

type WeatherIconTempWrapperSize = {
  small: boolean | undefined
}

type WeatherGraphicProps = {
  isMargin: boolean;
}

export const WeatherInfoGraphic = (props: { src: string, temp: number, small?: boolean, isMargin: boolean}) => {
  return(
    <WeatherIconTempWrapper small={props.small} >
      <CustomIcon alt="weatherIcon" src={props.src}/>
      <Temp isMargin={props.isMargin}>{`${props.temp}\u00b0`}</Temp>
    </WeatherIconTempWrapper>
  )
};