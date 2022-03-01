import * as React from "react";
import { useEffect, useState } from "react";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailItem } from "./DetailItem";
import { CustomParagraph, DetailLine, Details } from "./CurrentWeatherInfo";
import styled from "styled-components";
import { getMoonPhase } from "../utils/moonPhaseFormatter";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ChartDailyTemperature } from "./ChartDailyTemperature";
import { device } from "../styles/responsive";
import { getCurrentWeatherDetailsChartData } from "../utils/chartData";
import { getCurrentWeatherDetailsItemFrom } from "../utils/detailsItem";

const WeatherDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1rem;
  position: relative;
  width: 100%;
  
  & > div > p {
    margin: -1rem 0 0 2rem;
  } 

  div:nth-child(2) {
    align-items: flex-end;
  }

  @media (max-width: 660px) {
    flex-direction: column;
    align-items: center;

    & > div > div {
      justify-content: center;
    }

    & > div {
      align-items: center;
    }

    div:nth-child(2) {
      align-items: center;
    }
  }
  
  @media ${device.mobileLarge}{
    
    & > div > div > span {
      font-size: 6em;
      margin-bottom: 1rem;
    }
    
    & > div > div > img {
      width: 10em;
    }
  }
`;

const ReversedDropdownIcon = styled(RiArrowDropDownLine)`
  font-size: 4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transform: rotate(180deg);

  @media ${device.tablet} {
    font-size: 2rem;
  }

  @media ${device.mobileMedium} {
    font-size: 2rem;
    right: .5rem;
  }

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 1em;
  position: relative;
  width: 100%;
  
  @media (max-width: 660px) {
    justify-content: center;
    align-items: center;
  }
  
  @media ${device.tablet} {
    
    div:nth-child(2) > div > div > div > img {
      width: 3.5em;
    }

    div:nth-child(2) > div {
      justify-content: space-around;
    }
  }

  @media ${device.mobileLarge} {
    div:nth-child(2) > div > div > div > img {
      width: 3em;
    }
  }
`;

const ResponsiveDetails = styled(Details)`
  align-self: flex-end; 
  padding: 0 1rem;
  width: 70%;
  margin-top: 3rem;
  
  span {
    font-size: 2rem;
  }
  
  @media ${device.tablet}{
    
    span {
      font-size: 1.5rem;
    }
    
    img {
      width: 4.5rem
    }
  }
  
  @media (max-width: 660px){
    align-self: center;
    width: auto;

    & > div {
      margin-bottom: 0;
    }
    
    & > div > div {
      margin-right: 2rem;
    }
  }
`;

export type CurrentWeatherDetailsProps = {
  data: IDailyFormattedForecastResponse

}

export type MoonPhaseDescription = {
  description: string;
  icon: string
}

export const CurrentWeatherDetails = ({ data }: CurrentWeatherDetailsProps) => {

  const [moonphase, setMoonphase] = useState<MoonPhaseDescription>({ description: "", icon: "" });

  useEffect(() => {
    setMoonphase(getMoonPhase(data));
  }, []);

  const icon = data.weather[0].icon;

  const weatherDetailItems = getCurrentWeatherDetailsItemFrom(data);

  return (
    <WeatherDetailsWrapper style={{ margin: "0 0 3rem 0" }}>
      <ReversedDropdownIcon />
      <LeftSideWrapper>
        <Wrapper>
          <WeatherInfoGraphic src={icon} temp={data.temp.day} isMargin />
          <CustomParagraph fontSize={3} textAlign="left">{data.description}</CustomParagraph>
        </Wrapper>
        <Wrapper>
          <ResponsiveDetails>
            <DetailLine style={{justifyContent: "space-around"}}>
              <DetailItem fontSize={2.7} iconName="thermometer-warmer" text={`Max ${data.temp.max}\u00b0`}/>
              <DetailItem fontSize={2.7} iconName="thermometer-colder" text={`Min ${data.temp.min}\u00b0`}/>
            </DetailLine>
          </ResponsiveDetails>
          <ChartDailyTemperature data={getCurrentWeatherDetailsChartData(data)} />
        </Wrapper>
      </LeftSideWrapper>
      <Details style={{ width: "100%" }}>
        {
          weatherDetailItems.map(detailItem => (
            <DetailLine>
              <DetailItem label={detailItem.value} iconName={detailItem.iconName} text={detailItem.label} wide
                          fontSize={2} />
            </DetailLine>
          ))
        }
      </Details>
    </WeatherDetailsWrapper>
  );
};
