import { getTime } from "../utils/timeUtility";
import * as React from "react";
import styled from "styled-components";

const ClockWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;


    & > p{
        font-size: 5rem;
        font-weight: 300;
    }
`;

const { useState, useEffect } = React;


const Clock = () => {
    
    const [time, setTime] = useState<string>("00:00:00");

    useEffect(() => {
        let intervalId = setInterval(() => {
            setTime(getTime());
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return(
    <ClockWrapper>
        <p>{time}</p>
    </ClockWrapper>
    )
};

export default Clock;