import axios from "axios";

export const getCurrentWeatherByCityName: Function = async (
  cityName: string,
  units: string = "metric",
  lang: string = "end"
) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=${
      process.env.REACT_APP_NOT_WEATHER_API_KEY
    }&units=${units}&lang=${lang}`
  );
  console.log(response);
  return response;
};

export const getWeeklyForecastByCityName: Function = async (
  cityName: string,
  units: string = "metric",
  lang: string = "end"
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.toLowerCase()}&APPID=${
        process.env.REACT_APP_NOT_WEATHER_API_KEY
      }&units=${units}&lang=${lang}&exclude=minutely,hourly,current`
    );
    return response;
  } catch (err) {
    // console.log(err.message);
  }
};

interface ICoordinates {
  lat: number;
  long: number;
}

export const getWeeklyForecastByCoordinates: Function = async (
  coordinates: ICoordinates,
  units: string = "metric",
  lang: string = "end"
) => {
  console.log(coordinates.lat);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&APPID=${process.env.REACT_APP_NOT_WEATHER_API_KEY}&units=${units}&lang=${lang}&exclude=minutely,hourly,current`
    );
    return response;
  } catch (err) {
    // console.log(err.message);
  }
};
