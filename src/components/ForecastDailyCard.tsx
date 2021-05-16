import * as React from "react";

type ForeCastCardProps = {
  forecast: any;
};

const ForecastDailyCard = ({ forecast }: ForeCastCardProps) => {
  const { dt_txt } = forecast;

  return <h1>{dt_txt}</h1>;
};

export default ForecastDailyCard;
