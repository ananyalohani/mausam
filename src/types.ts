export interface Weather {
  state: string;
  icon: string;
}

export interface LocationWeather {
  location: string;
  sixDayWeather: Array<WeatherData>;
}

export interface WeatherData {
  date: Date;
  icon?: string;
  weatherState: string;
  weatherStateAbbr: string;
  windSpeed: Speed;
  windDirection: string;
  temperature: Temperature;
  minTemperature: Temperature;
  maxTemperature: Temperature;
  airPressure: Pressure;
  humidity: number;
  visibility: Distance;
}

export interface Pressure {
  mbar: number;
  pa?: number;
}

export interface Speed {
  kmph?: number;
  mph: number;
}

export interface Distance {
  km?: number;
  miles: number;
}

export interface CurrentWeatherProps {
  weather: Weather;
  temperature: number;
  date: Date;
  location: string;
}

export interface Temperature {
  celsius: number;
  farenheit?: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export const dateString = (date: Date): string => {
  const arr = (date + '').split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1];
};

export const celsiusToFarenheit = (temp: number) => (9 / 5) * temp + 32;

export const milesToKm = (dist: number) => dist * 1.609344;

export const mbarToPa = (pre: number) => pre * 100;
