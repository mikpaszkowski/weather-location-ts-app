import * as React from "react";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";
import { IHourlyForecast } from "../services/wetherAPI";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 4rem 6rem;
`;

type Props = {
  forecast: IHourlyForecast;
};

export const ForecastDailyCard = ({ forecast }: Props): JSX.Element => {
  return (
    <CardWrapper>
      <CustomIcon src={forecast.icon} alt="weather-icon" />{" "}
    </CardWrapper>
  );
};
