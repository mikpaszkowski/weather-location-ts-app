import * as React from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../hooks/storeHooks";
import { selectCurrentWeather } from "../store/forecast/forecastSlice";
import { EntryViewType } from "./WeatherResult";
import { device } from "../styles/responsive";
import { DetailItem } from "./DetailItem";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";

const slideDown = keyframes`
  from {
    transform: translateX(-5rem);
    opacity: 0;
  }
  to {
    transform: translateX(0rem);
    opacity: 1;
  }
`;

const CurrentWeatherResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin: 2rem 0 2.5rem 0;
  padding: 2rem 4rem;
  width: 100%;
  border-radius: 3rem;
  transition: 0.6s 0.3s ease-in-out;
  transform: translateX(0);
  animation-name: ${slideDown};
  animation-duration: 0.5s;
  animation-delay: ${(props: EntryViewType) =>
          props.entryView ? "0.4s" : "0s"};
  animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
  animation-fill-mode: both;
  background-color: #9c9c9c78;
  backdrop-filter: blur(4px);
  will-change: transform;
  
  @media ${device.tabletSmall}{
    padding: 2rem;
  }
  
  @media ${device.mobileMedium}{
    margin: 1rem 0 1rem 0;
  }
`;

const DateLocationWrapper = styled.div`
  position: relative;
  text-align: left;
  font-size: 1em;
  width: 100%;
`;

const LocationName = styled.h1`
  font-size: 3.5em;
  font-weight: 400;
`;

const DateName = styled.span`
  display: block;
  font-size: 2.2em;
  font-weight: 300;
`;


const MainGeoWeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  font-size: 1em;

  @media ${device.tablet} {
    font-size: 0.8em;
  }

  @media ${device.mobileLarge} {
    font-size: 0.6em;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-self: self-end;
  font-size: 1rem;
  padding: 0 2rem;
  border: 1px #ffffffab solid;
  border-radius: 16px;

  @media ${device.tablet} {
    align-self: flex-end;
  }

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  
  @media ${device.tablet}{
    
    & > div > div > div > div > img {
      width: 3.5em;
    }
  }

  @media ${device.mobileLarge}{

    & > div > div > div > div > img {
      width: 3em;
    }

    & > div > div > div > div > p {
      font-size: 1.5em;
    }
  }
`;

export const CustomParagraph = styled.p`
  max-width: 22rem;
  font-size: ${(props: CustomParagraphProps) => props.fontSize ? `${props.fontSize}em` : "2rem"};
  text-align: ${(props: CustomParagraphProps) => props.textAlign ? props.textAlign : "right"};
  
  @media ${device.tablet}{
    font-size: ${(props: CustomParagraphProps) => props.fontSize ? `${0.8 * props.fontSize}em` : "2rem"};
  }
  
  @media ${device.mobileLarge} {
    font-size: ${(props: CustomParagraphProps) => props.fontSize ? `${0.6 * props.fontSize}em` : "2rem"};
  }
`;

export const DetailLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px #ffffffab solid;
  font-size: 1em;

  &:last-child {
    border-bottom: none;
  }
`;

type CustomParagraphProps = {
  textAlign?: "left" | "right" | "center"
  fontSize?: number
}

const CurrentWeatherInfo = ({ entryView }: EntryViewType) => {
  const currentWeather = useAppSelector(selectCurrentWeather);
  const { city, country, date, icon, temp } = currentWeather;

  return (
    <CurrentWeatherResultWrapper entryView={entryView}>
      <MainGeoWeatherInfo>
        <DateLocationWrapper>
          <LocationName>
            {city}, {country}
          </LocationName>
          <DateName>{`${date}`}</DateName>
        </DateLocationWrapper>
        <WeatherInfoGraphic src={icon} temp={temp} isMargin={true} />
      </MainGeoWeatherInfo>
      <Container>
        <CustomParagraph style={{marginBottom: "1rem"}} fontSize={2.7}>{currentWeather.description}</CustomParagraph>
        <CustomParagraph fontSize={2}>{`Feels like ${currentWeather.tempFeelsLike}\u00b0`}</CustomParagraph>
        <Details style={{ padding: "0 .5rem", margin: "1rem 0 0 0" }}>
          <DetailLine>
            <DetailItem fontSize={2.7} iconName="thermometer-warmer" text={`${currentWeather.tempMax}\u00b0`} noMargin/>
            <DetailItem fontSize={2.7} iconName="thermometer-colder" text={`${currentWeather.tempMin}\u00b0`} noMargin/>
          </DetailLine>
        </Details>
      </Container>
    </CurrentWeatherResultWrapper>
  );
};

export default CurrentWeatherInfo;
