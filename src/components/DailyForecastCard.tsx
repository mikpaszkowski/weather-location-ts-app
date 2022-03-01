import * as React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { CustomIcon } from "../iconComponents/CustomIcon";
import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { device } from "../styles/responsive";
import { RaindropPercentage } from "./RaindropPercentage";
import { CurrentWeatherDetails } from "./CurrentWeatherDetails";
import { RiArrowDropDownLine } from "react-icons/ri";

const DailyForecastCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${(props: DailyForecastCardState) => props.isOpen ? "flex-start" : "center"};
  font-size: 10px;
  padding: ${(props: DailyForecastCardState) => props.isOpen ? "6rem 6rem 2rem 6rem" : "0 4rem"};
  margin: 1rem 0;
  border-radius: 2rem;
  width: 100%;
  background-color: #616161c0;
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #272727;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  @media ${device.tablet} {
    font-size: 8px;
    padding: 1rem 2rem;
  }
  @media ${device.tabletSmall} {
    font-size: 7px;
    margin-left: 0;
    padding: 1rem 2rem;
    & > img {
      width: 4.5em;
    }
  }
  @media ${device.mobileLarge} {
    font-size: 6px;
    padding: 1rem 2rem;
    margin: 0.5rem 0;
  }
  
  @media ${device.mobileMedium}{
    padding: ${(props: DailyForecastCardState) => props.isOpen ? "1rem 1rem 2rem 1rem" : "0 1.5rem"}
  }
`;

const InfoGraphic = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 10px;
`;

const Date = styled.p`
  font-size: 2.5em;
  
  @media ${device.mobileMedium} {
    font-size: 2em;
  }
`;

const DayAndNightWeatherImage = styled.div`
  font-size: 10px;
  margin-left: 2em;

  & > img {
    width: 7em;
  }

  @media ${device.tablet} {
    font-size: 8px;

    & > img {
      width: 5em;
    }
  }

  @media ${device.tabletSmall} {
    font-size: 7px;
    margin-left: 0;
    & > img {
      width: 4.5em;
    }
  }

  @media ${device.mobileLarge} {
    font-size: 6px;
    margin-left: 0;

    & > img {
      width: 4em;
    }
  }

  @media ${device.mobileLarge} {
    font-size: 6px;
    Fmargin-left: 0;

    & > img {
      width: 3em;
    }
  }
`;

const Temperature = styled.p`
  font-size: 2.5em;
  margin-right: 1.7rem;
  
  @media ${device.mobileMedium}{
    font-size: 2em
  }
`;

export const CustomDropDownIcon = styled(RiArrowDropDownLine)`
  font-size: 4rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  @media ${device.tablet} {
    font-size: 2.5rem;
  }

  @media ${device.mobileMedium} {
    font-size: 2rem;
    right: .5rem;
  }
`;

type DailyForecastCardState = {
  isOpen: boolean
}

export const DailyForecastCard = (data: IDailyFormattedForecastResponse) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const myRef = useRef(null);

  const executeScroll = (isOpen: boolean) => {
    if (myRef.current !== null) {
      const ref = myRef.current as Element;
      ref.scrollIntoView({ behavior: "smooth", block: isOpen ? "end" : "center" });
    }
  };

  const dayIcon: string = data.weather[0].icon;

  const dropDownDetails = () => {
    setIsOpen(!isOpen);
    executeScroll(isOpen);
  };

  return (
    <DailyForecastCardWrapper onClick={dropDownDetails} isOpen={isOpen} ref={myRef}>
      {
        !isOpen ? <>
          <Date>{data.date}</Date>
          <InfoGraphic>
            <RaindropPercentage width="5em" percipitation={data.precipitation} />
            <DayAndNightWeatherImage>
              <CustomIcon alt="dayicon" width="7em" src={dayIcon} />
              <CustomIcon
                alt="nighticon"
                width="7em"
                src={dayIcon.replaceAll("d", "n")}
              />
            </DayAndNightWeatherImage>
          </InfoGraphic>
          <Temperature>{`${data.temp.day}\u00b0C/${data.temp.night}\u00b0C`}
            <CustomDropDownIcon />
          </Temperature>
        </> : null
      }
      {
        isOpen ? (
          <CurrentWeatherDetails data={data} />
        ) : null
      }
    </DailyForecastCardWrapper>
  );
};