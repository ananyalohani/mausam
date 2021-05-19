import React, { useState, useEffect } from 'react';
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
import { Location, LocationWeather, WeatherData } from './types';

const baseURL =
  'https://tranquil-brook-69806.herokuapp.com/https://www.metaweather.com/';

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

export const getWOEID = async (location: Location): Promise<any> => {
  const woeidURL =
    baseURL +
    `api/location/search/?lattlong=${location!.latitude},${
      location!.longitude
    }`;

  try {
    const response = await fetch(woeidURL);
    const data = await response.json();
    return data[0].woeid;
  } catch (err) {
    console.error(err);
  }
};

export const getWeatherByLocation = async ({
  location,
  setLocationWeather,
}: any): Promise<void> => {
  const woeid = await getWOEID(location);
  const forecastURL = baseURL + `api/location/${woeid}`;

  try {
    const response = await fetch(forecastURL);
    const data = await response.json();
    console.log(data);
    const lw: LocationWeather = { location: '', sixDayWeather: [] };
    lw.location = data.title;
    const arr: Array<WeatherData> = [];
    data.consolidated_weather.map((item: any) => {
      const dict: WeatherData = {
        date: new Date(item.applicable_date),
        weatherState: item.weather_state_name,
        weatherStateAbbr: item.weather_state_abbr,
        windDirectionAngle: item.wind_direction,
        windDirection: item.wind_direction_compass,
        humidity: roundVal(item.humidity),
        icon: assignIcon(item.weather_state_abbr),
        windSpeed: {
          mph: roundVal(item.wind_speed),
          kmph: roundVal(milesToKm(item.wind_speed)),
        },
        visibility: {
          miles: roundVal(item.visibility),
          km: roundVal(milesToKm(item.visibility)),
        },
        temperature: {
          celsius: roundVal(item.the_temp),
          farenheit: roundVal(celsiusToFarenheit(item.the_temp)),
        },
        minTemperature: {
          celsius: roundVal(item.min_temp),
          farenheit: roundVal(celsiusToFarenheit(item.min_temp)),
        },
        maxTemperature: {
          celsius: roundVal(item.max_temp),
          farenheit: roundVal(celsiusToFarenheit(item.max_temp)),
        },
        airPressure: {
          mbar: roundVal(item.air_pressure),
          pa: roundVal(mbarToPa(item.air_pressure)),
        },
      };
      dict.dateString = dateString(dict.date);
      arr.push(dict);
    });
    lw.sixDayWeather = arr;
    setLocationWeather(lw);
  } catch (err) {
    console.error(err);
  }
};

const assignIcon = (abbr: string): string => {
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

const dateString = (date: Date): string => {
  const arr = (date + '').split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1];
};

const roundVal = (val: number): number => Math.round(val);

const celsiusToFarenheit = (temp: number) => (9 / 5) * temp + 32;

const milesToKm = (dist: number) => dist * 1.609344;

const mbarToPa = (pre: number) => pre * 100;
