import * as React from "react";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 4rem 6rem;
`;

type ForeCastCardProps = {
  forecast: any;
};

export const ForecastDailyCard = ({ forecast }: ForeCastCardProps) => {
  const { dt_txt } = forecast;
  return (
    <CardWrapper>{/* <CustomIcon src={} alt="weather-icon"/> */}</CardWrapper>
  );
};
