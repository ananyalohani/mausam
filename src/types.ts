export interface Units {
  speed: 'kmph' | 'mph';
  distance: 'km' | 'miles';
  temperature: 'celsius' | 'farenheit';
  pressure: 'mbar' | 'pa';
}

export interface LocationWeather {
  location: string;
  sixDayWeather: Array<WeatherData>;
}

export interface WeatherData {
  date: Date;
  dateString?: string;
  icon?: string;
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
  pa: number;
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
