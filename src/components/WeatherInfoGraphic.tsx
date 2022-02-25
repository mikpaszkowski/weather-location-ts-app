import { CustomIcon } from "../iconComponents/CustomIcon";
import * as React from "react";
import styled from "styled-components";
import { device } from "../styles/responsive";

const WeatherIconTempWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;

  & > img {
    width: ${(props: WeatherIconTempWrapperSize) => props.small ? "14rem" : "20rem"};
  }

  @media ${device.tabletSmall} {
    justify-content: flex-start;

    & > img {
      width: ${(props: WeatherIconTempWrapperSize) => props.small ? "9rem" : "13rem"};
    }
  }

  @media ${device.mobileLarge} {
    justify-content: center;

    & > img {
      width: ${(props: WeatherIconTempWrapperSize) => props.small ? "7rem" : "11rem"};
    }
  }
`;

const Temp = styled.div`
  display: inline;
  margin-bottom: ${(props: WeatherGraphicProps) => props.isMargin ? '3rem' : '0' };
  font-size: 10rem;
  font-weight: 300;

  @media ${device.tabletSmall} {
    font-size: 5rem;
  }

  @media ${device.mobileLarge} {
    font-size: 3rem;
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