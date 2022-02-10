import * as React from "react";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailItem } from "./DetailItem";
import { DetailLine, Details } from "./CurrentWeatherInfo";
import { RaindropPercentage } from "./RaindropPercentage";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";
import { useEffect, useState } from "react";

const WeatherDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const MoonPhaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MoonPhaseDescription = styled.span`
  font-size: 2rem;
`;

type CurrentWeatherDetailsProps = {
  data: IDailyFormattedForecastResponse
}

type MoonPhaseDescription = {
  description: string;
  icon: string
}

export const CurrentWeatherDetails = ({ data }: CurrentWeatherDetailsProps) => {

  const [moonphase, setMoonphase] = useState<MoonPhaseDescription>({description: "", icon: ""})

  useEffect(() => {
    if(data.moonPhase === 0 || data.moonPhase === 100){
      setMoonphase({
        description: "New Moon",
        icon: "moon-new"
      })
    }else if (data.moonPhase > 0 && data.moonPhase < 25){
      setMoonphase({
        description: "Waxing Crescent",
        icon: "moon-waxing-crescent"
      })
    }else if(data.moonPhase === 25){
      setMoonphase({
        description: "First Quarter",
        icon: "moon-first-quarter"
      })
    }else if(data.moonPhase > 25 && data.moonPhase < 50){
      setMoonphase({
        description: "Waxing Gibbous",
        icon: "moon-waxing-gibbous"
      })
    }else if(data.moonPhase === 50){
      setMoonphase({
        description: "Full Moon",
        icon: "moon-full"
      })
    }else if(data.moonPhase > 50 && data.moonPhase < 75){
      setMoonphase({
        description: "Waning Gibbous",
        icon: "moon-waning-gibbous"
      })
    }else if(data.moonPhase === 75){
      setMoonphase({
        description: "Third Quarter",
        icon: "moon-last-quarter"
      })
    }else if(data.moonPhase > 75 && data.moonPhase < 100){
      setMoonphase({
        description: "Waining Crescent",
        icon: "moon-waining-crescent"
      })
    }
  }, [])

  const scaleMoonPhaseNumberToPercent = (phase: number): number => {
    if(phase <= 50) return phase * 2;
    return 100 - ((phase * 2) - 100);
  }

  const icon = data.weather[0].icon;
  return (
    <WeatherDetailsWrapper style={{ margin: "0 3rem" }}>
      <WeatherInfoGraphic src={icon} temp={data.temp.day} small />
      <Details style={{width: "100%"}}>
       <DetailLine>
         <DetailItem iconName="sunrise" text={data.sunrise} />
         <DetailItem iconName="sunset" text={data.sunset} />
       </DetailLine>
        <DetailLine>
          <DetailItem iconName="moonrise" text={data.moonrise} />
          <DetailItem iconName="moonset" text={data.moonset} />
        </DetailLine>
        <DetailLine>
          <div style={{ marginLeft: "1rem"}}>
            <RaindropPercentage width="5em" percipitation={data.precipitation} loosely/>
          </div>
          <DetailItem iconName="barometer" text={`${data.pressure.toString()} hPa`} />
        </DetailLine>
        <DetailLine>
          <MoonPhaseWrapper>
            <CustomIcon alt="moonphase" src={moonphase.icon}/>
            <MoonPhaseDescription>{moonphase.description} {scaleMoonPhaseNumberToPercent(data.moonPhase)}%</MoonPhaseDescription>
          </MoonPhaseWrapper>
        </DetailLine>
      </Details>
    </WeatherDetailsWrapper>

  );
};
