export type LoadStatus = 'OK' | 'ERROR' | 'LOADING';

export type TemperatureUnit = 'celsius' | 'farenheit';

export enum TempUnitEnum {
  'celsius' = '°C',
  'farenheit' = '°F',
}

export enum PressureUnitEnum {
  'mbar' = 'mb',
  'mpa' = 'mPa',
}

export interface Forecast {
  location: string;
  sixDayWeather: Array<DayWeather>;
}

export interface DayWeather {
  date: Date;
  dateString?: string;
  icon: string;
  weatherState: string;
  weatherStateAbbr: string;
  windSpeed: Speed;
  windDirectionAngle: number;
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
  mpa: number;
}

export interface Speed {
  kmph: number;
  mph: number;
}

export interface Distance {
  km: number;
  miles: number;
}

export interface Temperature {
  celsius: number;
  farenheit: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Units {
  speed: 'kmph' | 'mph';
  distance: 'km' | 'miles';
  temperature: TemperatureUnit;
  pressure: 'mbar' | 'mpa';
}
