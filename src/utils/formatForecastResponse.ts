import { getBasicTimeFormatFromTimestamp, getFormattedDate } from "./timeUtility";

export const formattedResponse: Function = (data: any) => {
    return {
        city: data.name,
        date: getFormattedDate(),
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: Math.round(data.main.temp),
        tempMax: Math.round(data.main.temp_max),
        tempMin: Math.round(data.main.temp_min),
        sunrise: getBasicTimeFormatFromTimestamp(data.sys.sunrise),
        sunset: getBasicTimeFormatFromTimestamp(data.sys.sunset),
        description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        clouds: data.clouds.all

    }
}