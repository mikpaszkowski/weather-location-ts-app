import * as React from "react";
import styled from "styled-components";
import {
  IWeatherDisplaySetting,
  toggleWeatherDisplay
} from "../store/weatherDisplay/weatherDisplaySettingSlice";
import { useDispatch } from "react-redux";
import { device } from "../styles/responsive";

const ToggleButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-self: flex-start;
  bottom: 1rem;
  left: 4rem;
  margin-bottom: 1rem;
  z-index: 2;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 2rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
`;

const DisplayMode = styled.button`
  z-index: 1;
  color: white;
  font-size: 2rem;
  height: 100%;
  width: 50%;
  padding: 1rem 4rem;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid #ffffff;

  :focus {
    background-color: #ffffff60;
  }

  :nth-child(3) {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  :nth-child(1) {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  @media ${device.mobileLarge} {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
`;

export const ToggleWeatherButton = () => {
  const dispatch = useDispatch();
  const toggleWeatherSetting = (setting: IWeatherDisplaySetting) => {
    dispatch(toggleWeatherDisplay(setting));
  };

  const settings: { mode: IWeatherDisplaySetting, label: string }[] = [
    {
      mode: {
        displaySetting: "today"
      },
      label: "Today"
    },
    {
      mode: {
        displaySetting: "daily"
      },
      label: "Daily"
    },
    {
      mode: {
        displaySetting: "hourly"
      },
      label: "Hourly"
    }
  ];

  return (
    <ToggleButton>
      {settings.map(setting => (
        <DisplayMode onClick={(e) => {
          toggleWeatherSetting(setting.mode);
          e.currentTarget.focus();
        }}>{setting.label}</DisplayMode>
      ))}
    </ToggleButton>
  );
};
