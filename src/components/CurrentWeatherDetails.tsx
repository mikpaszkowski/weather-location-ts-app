import * as React from "react";
import { useEffect, useState } from "react";
import { WeatherInfoGraphic } from "./WeatherInfoGraphic";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { DetailItem } from "./DetailItem";
import { DetailLine, Details } from "./CurrentWeatherInfo";
import { RaindropPercentage } from "./RaindropPercentage";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getWindDirection } from "../utils/windFormatter";
import { getMoonPhase, scaleMoonPhaseNumberToPercent } from "../utils/moonPhaseFormatter";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TodayInfoItemType } from "./TodayForecast";

const WeatherDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

const MoonPhaseDescriptionSpan = styled.span`
  font-size: 2rem;
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
    setMoonphase(getMoonPhase(data))
  }, []);

  const icon = data.weather[0].icon;
  const moonIcon = moonphase.icon;

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
      value: ` %`,
      label: "Cloudiness"
    },
    {
      iconName: "uv-index",
      value: `${data.uvi} %`,
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
  ]


  return (
    <WeatherDetailsWrapper style={{ margin: "0 0 3rem 0" }}>
      <ReversedDropdownIcon/>
      <LeftSideWrapper>
        <WeatherInfoGraphic src={icon} temp={data.temp.day} small isMargin={false}/>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" strokeWidth={3} />
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
      </LeftSideWrapper>
      <Details style={{width: "100%"}}>
        {
          weatherDetailItems.map(detailItem => (
            <DetailLine>
              <DetailItem label={detailItem.value} small iconName={detailItem.iconName} text={detailItem.label} wide fontSize="2rem"/>
            </DetailLine>
          ))
        }
      </Details>
    </WeatherDetailsWrapper>

  );
};
