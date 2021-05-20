import snow from './assets/images/snow.png';
import showers from './assets/images/shower.png';
import light_cloud from './assets/images/light_cloud.png';
import thunderstorm from './assets/images/thunderstorm.png';
import heavy_rain from './assets/images/heavy_rain.png';
import clear from './assets/images/clear.png';
import hail from './assets/images/hail.png';
import light_rain from './assets/images/light_rain.png';
import sleet from './assets/images/sleet.png';
import heavy_cloud from './assets/images/heavy_cloud.png';

export const getCurrentLocation = ({ setLocation }: any) => {
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.error(error);
    }
  );
};

export const assignIcon = (abbr: string): string => {
  switch (abbr) {
    case 'sn':
      return snow;
    case 'sl':
      return sleet;
    case 'h':
      return hail;
    case 't':
      return thunderstorm;
    case 'hr':
      return heavy_rain;
    case 'lr':
      return light_rain;
    case 'hc':
      return heavy_cloud;
    case 'lc':
      return light_cloud;
    case 'c':
      return clear;
    case 's':
      return showers;
    default:
      return '';
  }
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const dateString = (date: Date): string => {
  const arr = (date + '').split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1];
};

export const roundVal = (val: number): number => Math.round(val);

export const celsiusToFarenheit = (temp: number) => (9 / 5) * temp + 32;

export const milesToKm = (dist: number) => dist * 1.609344;

export const mbarToPa = (pre: number) => pre * 100;
