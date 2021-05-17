import * as React from "react";

type ForeCastCardProps = {
  forecast: any;
};

export const ForecastDailyCard = ({ forecast }: ForeCastCardProps) => {
  const { dt_txt } = forecast;

  return <h1>{dt_txt}</h1>;
};
