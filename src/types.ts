export interface Weather {
  state: string;
  icon: string;
}

export interface CurrentWeatherProps {
  weather: Weather;
  temperature: number;
  date: Date;
  location: string;
}

export interface Temperature {
  celsius: number;
  farenheit: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export type WeatherState =
  | 'sn'
  | 'sl'
  | 'h'
  | 't'
  | 'hr'
  | 'lr'
  | 's'
  | 'hc'
  | 'lc'
  | 'c';

export enum StateString {
  'sn' = 'Snow',
  'sl' = 'Sleet',
  'h' = 'Hail',
  't' = 'Thunderstorm',
  'hr' = 'Heavy Rain',
  'lr' = 'Light Rain',
  's' = 'Showers',
  'hc' = 'Heavy Cloud',
  'lc' = 'Light Cloud',
  'c' = 'Clear',
}

export const dateString = (date: Date): string => {
  const arr = (date + '').split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1];
};
