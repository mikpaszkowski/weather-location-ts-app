
interface ICurrWeather {
    city: string;
    date: string;
    country: string;
    lat: number;
    lon: number;
    humidity: number;
    pressure: number;
    temp: number;
    tempMax: number;
    tempMin: number;
    sunrise: string;
    sunset: string;
    description: string;
    icon: string;
    windSpeed: number;
    clouds: string
}

type CurrWeatherState = {
    currWeather: ICurrWeather
}

type CurrWeatherAction = {
    type: string;
    payload: ICurrWeather
}

type CurrWeatherDispatchType = (args: CurrWeatherAction) => CurrWeatherAction;




type IFeelsLike = {
    day: number;
    night: number;
}

type ITemp = {
    max: number;
    min: number;
}

interface IDailyForecast {
    date: string;
    clouds: number;
    feelsLike: IFeelsLike;
    humitidy: number;
    moonrise: number;
    moonset: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    rain: number;
    temp: ITemp;
    windSpeed: number;
    description: string;
    icon: string;
}

type WeeklyForecastState = {
    weeklyForecast: Array<IDailyForecast>
}

type WeeklyForecastAction = {
    type: string;
    payload: Array<IDailyForecast>
}

type WeeklyForecastDispatchType = (args: WeeklyForecastAction) => WeeklyForecastAction;




