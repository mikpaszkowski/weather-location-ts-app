import { IDailyFormattedForecastResponse } from "../services/api/wetherAPI";
import { MoonPhaseDescription } from "../components/CurrentWeatherDetails";

export const scaleMoonPhaseNumberToPercent = (phase: number): number => {
  if (phase <= 50) return phase * 2;
  return 100 - ((phase * 2) - 100);
};

export const getMoonPhase = (data: IDailyFormattedForecastResponse): MoonPhaseDescription => {
  if (data.moonPhase === 0 || data.moonPhase === 100) {
    return {
      description: "New Moon",
      icon: "moon-new"
    };
  } else if (data.moonPhase > 0 && data.moonPhase < 25) {
    return {
      description: "Waxing Crescent",
      icon: "moon-waxing-crescent"
    }
  } else if (data.moonPhase === 25) {
    return {
      description: "First Quarter",
      icon: "moon-first-quarter"
    }
  } else if (data.moonPhase > 25 && data.moonPhase < 50) {
    return {
      description: "Waxing Gibbous",
      icon: "moon-waxing-gibbous"
    }
  } else if (data.moonPhase === 50) {
    return {
      description: "Full Moon",
      icon: "moon-full"
    }
  } else if (data.moonPhase > 50 && data.moonPhase < 75) {
    return {
      description: "Waning Gibbous",
      icon: "moon-waning-gibbous"
    }
  } else if (data.moonPhase === 75) {
    return {
      description: "Third Quarter",
      icon: "moon-last-quarter"
    }
  } else if (data.moonPhase > 75 && data.moonPhase < 100) {
    return {
      description: "Waining Crescent",
      icon: "moon-waning-crescent"
    }
  }
  return {
    description: "",
    icon: ""
  }
}