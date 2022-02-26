import * as React from "react";
import { useEffect, useState } from "react";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailItem } from "./DetailItem";
import { CustomSpan, DetailLine, Details } from "./CurrentWeatherInfo";
import styled from "styled-components";
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getWindDirection } from "../utils/windFormatter";
import { getMoonPhase } from "../utils/moonPhaseFormatter";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TodayInfoItemType } from "./TodayForecast";
import { CustomIcon } from "../iconComponents/CustomIcon";

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
  position: relative;
  width: 100%;
`;

const ReversedDropdownIcon = styled(RiArrowDropDownLine)`
  font-size: 4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transform: rotate(180deg);
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 85%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  width: 100%;
`;


const LabelY = styled.span`
  position: absolute;
  font-size: 1.3rem;
  transform: translateY(-50%) rotate(-90deg);
  left: -1.5rem;
  top: 40%
`;

const LabelX = styled.span`
  position: absolute;
  font-size: 1.3rem;
  bottom: -1rem;
  left: 55%
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

  const chartData: any[] = [
    {
      name: "5:00",
      temperature: data.feelsLike.morn
    },
    {
      name: "12:00",
      temperature: data.feelsLike.day
    },
    {
      name: "20:00",
      temperature: data.feelsLike.eve
    },
    {
      name: "1:00",
      temperature: data.feelsLike.night
    }
  ];

  const weatherDetailItems: TodayInfoItemType[] = [
    {
      iconName: "sunrise",
      value: `${data.sunrise}`,
      label: "Sunrise"
    },
    {
      iconName: "sunset",
      value: `${data.sunset}`,
      label: "Sunset"
    },
    {
      iconName: "moonrise",
      value: `${data.moonrise}`,
      label: "Moonrise"
    },
    {
      iconName: "moonset",
      value: `${data.moonset}`,
      label: "Moonset"
    },
    {
      iconName: "overcast",
      value: `${data.clouds} %`,
      label: "Cloudiness"
    },
    {
      iconName: "uv-index",
      value: `${Math.round(data.uvi)} / 10`,
      label: "Index UV"
    },
    {
      iconName: "barometer",
      value: `${data.pressure} hPa`,
      label: "Pressure"
    },
    {
      iconName: "windsock",
      value: `${data.wind_speed.toString()} m/s (${getWindDirection(data.wind_deg)})`,
      label: "Wind"
    },
    {
      iconName: "humidity",
      value: `${data.humidity} %`,
      label: "Humidity"
    }
  ];

  return (
    <WeatherDetailsWrapper style={{ margin: "0 0 3rem 0" }}>
      <ReversedDropdownIcon />
      <LeftSideWrapper>
       <Wrapper style={{alignItems: "flex-start"}}>
         <WeatherInfoGraphic src={icon} temp={data.temp.day} small isMargin={false} />
         <CustomSpan style={{margin: "1rem 0 0 2rem"}} fontSize="2.5rem">{data.description}</CustomSpan>
       </Wrapper>
        <Wrapper>
          <ChartWrapper>
            <LabelY>Temperature</LabelY>
            <LabelX>Time</LabelX>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" strokeWidth={1} />
                <XAxis dataKey="name" stroke="#ffffff">
                  <Label position="insideBottom" stroke="#ffffff" fill="#ffffff" />
                </XAxis>
                <YAxis stroke="#ffffff">
                  {/*<Label value="Temperature" angle={-90} position="insideLeft" stroke="#ffffff" fill="#ffffff"*/}
                  {/*       style={{ fontSize: "40px" }} />*/}
                </YAxis>
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#90f2bc" activeDot={{ r: 8 }} strokeWidth={5} />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
          <Details style={{ alignSelf: "flex-end", padding: 0, margin: "3rem 0 0 0", width: "70%" }}>
            <DetailLine>
              <DetailItem fontSize="2.7rem" iconName="thermometer-warmer" text={`${data.temp.max}\u00b0`} />
              <DetailItem fontSize="2.7rem" iconName="thermometer-colder" text={`${data.temp.min}\u00b0`} />
            </DetailLine>
          </Details>
        </Wrapper>
      </LeftSideWrapper>
      <Details style={{ width: "100%" }}>
        {
          weatherDetailItems.map(detailItem => (
            <DetailLine>
              <DetailItem label={detailItem.value} small iconName={detailItem.iconName} text={detailItem.label} wide
                          fontSize="2rem" />
            </DetailLine>
          ))
        }
      </Details>
    </WeatherDetailsWrapper>
  );
};
