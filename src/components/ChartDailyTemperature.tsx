import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import * as React from "react";
import styled from "styled-components";

const ChartWrapper = styled.div`
  position: relative;
  width: 85%;
  margin-top: 2rem;

  & > div > svg {
    margin-left: -2rem;
  }

  @media (max-width: 660px) {
    margin-left: -4rem;
  }
`;

export const ChartDailyTemperature = (props: { data: any[] }) => {
  return <ChartWrapper>
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={props.data}
      >
        <CartesianGrid strokeDasharray="3 3" strokeWidth={1} />
        <XAxis dataKey="name" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Line type="monotone" dataKey="temperature" stroke="#90f2bc" dot={false} strokeWidth={2.5} />
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>;
};