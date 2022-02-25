import { useAppSelector } from "../hooks/storeHooks";
import { selectCurrentWeather } from "../store/forecast/forecastSlice";
import { DetailLine, Details } from "./CurrentWeatherInfo";
import { DetailItem } from "./DetailItem";
import { getWindDirection } from "../utils/windFormatter";

type TodayInfoItemType = {
  iconName: string;
  value: string;
  label: string
}

export const TodayForecast = () => {
  const currentWeather = useAppSelector(selectCurrentWeather);

  const todayInfoItems: TodayInfoItemType[] = [
    {
      iconName: "overcast",
      value: `${currentWeather.clouds} %`,
      label: "Cloudiness"
    },
    {
      iconName: "sunrise",
      value: `${currentWeather.sunrise}`,
      label: "Sunrise"
    },
    {
      iconName: "sunset",
      value: `${currentWeather.sunset}`,
      label: "Sunset"
    },
    {
      iconName: "barometer",
      value: `${currentWeather.pressure} hPa`,
      label: "Pressure"
    },
    {
      iconName: "windsock",
      value: `${currentWeather.windSpeed.toString()} m/s (${getWindDirection(currentWeather.windDeg)})`,
      label: "Wind"
    },
    {
      iconName: "humidity",
      value: `${currentWeather.humidity} %`,
      label: "Humidity"
    }
  ];

  return (
    <Details style={{ backgroundColor: "#9c9c9c78", backdropFilter: "blur(4px)" }}>, {
      todayInfoItems.map(({ iconName, value, label }) => (
        <DetailLine>
          <DetailItem iconName={iconName} text={label} label={value} wide />
        </DetailLine>
      ))
    }
    </Details>
  );
};