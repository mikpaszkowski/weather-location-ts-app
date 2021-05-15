import { getTimeToDisplay } from "../utils/timeUtility";
import * as React from "react";
import styled, { css, keyframes } from "styled-components";

const slidLeft = keyframes`
    from{
        transform: translateX(4rem);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`;

const ClockWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  animation: ${css`
    ${slidLeft} 1s ease 4s both
  `};
  & > p {
    font-size: 5rem;
    font-weight: 300;
  }
`;
const { useState, useEffect } = React;

const Clock: React.FunctionComponent = () => {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(getTimeToDisplay());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ClockWrapper>
      <p>{time}</p>
    </ClockWrapper>
  );
};

export default Clock;
