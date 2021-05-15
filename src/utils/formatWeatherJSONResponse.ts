import { getBasicTimeFormatFromTimestamp, getFormattedDate } from "../utils/timeUtility";

export const formatWeatherJSONResponse: Function = (data: any) => {
    return {
        city: data.name,
        date: getFormattedDate(data.dt),
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        hiumidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        sunrise: getBasicTimeFormatFromTimestamp(data.sys.sunrise),
        sunset: getBasicTimeFormatFromTimestamp(data.sys.sunset),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        clouds: data.clouds.all

    }
}