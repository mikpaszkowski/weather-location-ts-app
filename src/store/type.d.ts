
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

type DispatchType = (args: CurrWeatherAction) => CurrWeatherAction;


