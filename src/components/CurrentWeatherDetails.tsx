import * as React from "react";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailItem } from "./DetailItem";
import { DetailLine, Details } from "./CurrentWeatherInfo";
import { RaindropPercentage } from "./RaindropPercentage";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Label, Line } from "recharts";

const WeatherDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 40rem;
  height: 20rem;
`;

type CurrentWeatherDetailsProps = {
  data: IDailyFormattedForecastResponse
}

type MoonPhaseDescription = {
  description: string;
  icon: string
}

export const CurrentWeatherDetails = ({ data }: CurrentWeatherDetailsProps) => {

  const [moonphase, setMoonphase] = useState<MoonPhaseDescription>({ description: "", icon: "" });

  useEffect(() => {
    if (data.moonPhase === 0 || data.moonPhase === 100) {
      setMoonphase({
        description: "New Moon",
        icon: "moon-new"
      });
    } else if (data.moonPhase > 0 && data.moonPhase < 25) {
      setMoonphase({
        description: "Waxing Crescent",
        icon: "moon-waxing-crescent"
      });
    } else if (data.moonPhase === 25) {
      setMoonphase({
        description: "First Quarter",
        icon: "moon-first-quarter"
      });
    } else if (data.moonPhase > 25 && data.moonPhase < 50) {
      setMoonphase({
        description: "Waxing Gibbous",
        icon: "moon-waxing-gibbous"
      });
    } else if (data.moonPhase === 50) {
      setMoonphase({
        description: "Full Moon",
        icon: "moon-full"
      });
    } else if (data.moonPhase > 50 && data.moonPhase < 75) {
      setMoonphase({
        description: "Waning Gibbous",
        icon: "moon-waning-gibbous"
      });
    } else if (data.moonPhase === 75) {
      setMoonphase({
        description: "Third Quarter",
        icon: "moon-last-quarter"
      });
    } else if (data.moonPhase > 75 && data.moonPhase < 100) {
      setMoonphase({
        description: "Waining Crescent",
        icon: "moon-waining-crescent"
      });
    }
  }, []);

  const scaleMoonPhaseNumberToPercent = (phase: number): number => {
    if (phase <= 50) return phase * 2;
    return 100 - ((phase * 2) - 100);
  };

  type WindDirectionShortcuts = {
    [name: string]: string
  }

  const windDirectionShortcutsMap: WindDirectionShortcuts = {
    "N": "North",
    "NNE": "North-Northeast",
    "NE": "Northeast",
    "ENE": "East-Northeast",
    "E": "East",
    "ESE": "East-Southeast",
    "SE": "Southeast",
    "SSE": "South-Southeast",
    "SSW": "South-Southwest",
    "SW": "Southwest",
    "WSW": "West-Southwest",
    "W": "West",
    "WNW": "West-Northwest",
    "NW": "Northwest",
    "NNW": "North-Northwest"
  }

  const getWindDirection = (windDeg: number): string => {
    if (windDeg >= 348.75 && windDeg < 11.25) {
      return "N";
    } else if (windDeg >= 11.25 && windDeg < 33.75) {
      return "NNE";
    } else if (windDeg >= 33.75 && windDeg < 56.25) {
      return "NE";
    } else if (windDeg >= 56.25 && windDeg < 78.75) {
      return "ENE";
    } else if (windDeg >= 78.75 && windDeg < 101.25) {
      return "E";
    } else if (windDeg >= 101.25 && windDeg < 123.75) {
      return "ESE";
    } else if (windDeg >= 123.75 && windDeg < 146.25) {
      return "SE";
    } else if (windDeg >= 146.25 && windDeg < 168.75) {
      return "SSE";
    } else if (windDeg >= 168.75 && windDeg < 191.25) {
      return "South";
    } else if (windDeg >= 191.25 && windDeg < 213.75) {
      return "SSW";
    } else if (windDeg >= 213.75 && windDeg < 236.25) {
      return "SW";
    } else if (windDeg >= 236.25 && windDeg < 258.75) {
      return "WSW";
    } else if (windDeg >= 258.75 && windDeg < 281.25) {
      return "W";
    } else if (windDeg >= 281.25 && windDeg < 303.75) {
      return "WNW";
    } else if (windDeg >= 303.75 && windDeg < 326.25) {
      return "NW";
    }
    return "NNW";
  };

  const icon = data.weather[0].icon;

  const chartData: any[] = [
    {
      name: "5:00",
      temperature: data.temp.morn
    },
    {
      name: "12:00",
      temperature: data.temp.day
    },
    {
      name: "20:00",
      temperature: data.temp.eve
    },
    {
      name: "1:00",
      temperature: data.temp.night
    }
  ]

  return (
    <WeatherDetailsWrapper style={{ margin: "0 0 3rem 3rem" }}>
      <LeftSideWrapper>
        <WeatherInfoGraphic src={icon} temp={data.temp.day} small />
        <ResponsiveContainer width="100%" height={250} >
          <LineChart data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" strokeWidth={3}/>
            <XAxis dataKey="name" stroke="#ffffff">
              <Label position="insideBottom" stroke="#ffffff" fill="#ffffff" />
            </XAxis>
            <YAxis stroke="#ffffff">
              <Label value="Temperature" angle={-90} position="insideLeft" stroke="#ffffff" fill="#ffffff" style={{fontSize: "40px"}}/>
            </YAxis>
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#90f2bc" activeDot={{ r: 8 }} strokeWidth={5}/>
          </LineChart>
        </ResponsiveContainer>
      </LeftSideWrapper>
      <Details style={{width: "50%"}}>
        <DetailLine>
          <DetailItem small iconName="sunrise" text={data.sunrise} />
          <DetailItem small iconName="sunset" text={data.sunset} />
        </DetailLine>
        <DetailLine>
          <DetailItem small iconName="moonrise" text={data.moonrise} />
          <DetailItem small iconName="moonset" text={data.moonset} />
        </DetailLine>
        <DetailLine>
          <div style={{ marginLeft: "1rem" }}>
            <RaindropPercentage width="5em" percipitation={data.precipitation} loosely />
          </div>
          <DetailItem small iconName="barometer" text={`${data.pressure.toString()} hPa`} />
        </DetailLine>
        <DetailLine>
          <DetailItem small iconName="overcast" text={`${data.clouds.toString()} %`} />
          <DetailItem small iconName="windsock" text={`${getWindDirection(data.wind_deg)} ${data.wind_speed.toString()} m/s`} />
        </DetailLine>
        <DetailLine>
          <MoonPhaseWrapper>
            <CustomIcon alt="moonphase" src={moonphase.icon} />
            <MoonPhaseDescription>{moonphase.description} {scaleMoonPhaseNumberToPercent(data.moonPhase)}%</MoonPhaseDescription>
          </MoonPhaseWrapper>
        </DetailLine>
      </Details>
    </WeatherDetailsWrapper>

  );
};
