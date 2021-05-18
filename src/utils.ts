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
import {
  Location,
  LocationWeather,
  WeatherData,
  celsiusToFarenheit,
  milesToKm,
  mbarToPa,
} from './types';

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

export const getWOEID = async ({ location, setWoeid }: any): Promise<void> => {
  const woeidURL = `https://tranquil-brook-69806.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${
    location!.latitude
  },${location!.longitude}`;

  try {
    const response = await fetch(woeidURL);
    const data = await response.json();
    setWoeid(data[0].woeid);
  } catch (err) {
    console.error(err);
  }
};

export const getWeatherByLocation = async ({
  woeid,
  setLocationWeather,
}: any): Promise<void> => {
  const forecastURL = `https://tranquil-brook-69806.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;

  try {
    const response = await fetch(forecastURL);
    const data = await response.json();
    console.log(data);
    const lw: LocationWeather = { location: '', sixDayWeather: [] };
    lw.location = data.title;
    const arr: Array<WeatherData> = [];
    data.consolidated_weather.map((item: any) => {
      const dict: WeatherData = {
        date: new Date(item.date),
        weatherState: item.weather_state_name,
        weatherStateAbbr: item.weather_state_abbr,
        windDirection: item.wind_direction,
        humidity: item.humidity,
        icon: assignIcon(item.weather_state_abbr),
        windSpeed: {
          mph: item.wind_speed,
          kmph: milesToKm(item.wind_speed),
        },
        visibility: {
          miles: item.visibility,
          km: milesToKm(item.visibility),
        },
        temperature: {
          celsius: item.the_temp,
          farenheit: celsiusToFarenheit(item.the_temp),
        },
        minTemperature: {
          celsius: item.min_temp,
          farenheit: celsiusToFarenheit(item.min_temp),
        },
        maxTemperature: {
          celsius: item.max_temp,
          farenheit: celsiusToFarenheit(item.max_temp),
        },
        airPressure: {
          mbar: item.air_pressure,
          pa: mbarToPa(item.air_pressure),
        },
      };
      arr.push(dict);
    });
    lw.sixDayWeather = arr;
    setLocationWeather(lw);
  } catch (err) {
    console.error(err);
  }
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
    case 's':
      return snow;
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
