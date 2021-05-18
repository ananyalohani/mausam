import React, { useState, useEffect } from 'react';
import './App.css';
import Panel, { IAppProps as CurrentWeatherProps } from './components/Panel';
import snow from './assets/images/snow.png';
import showers from './assets/images/shower.png';
import WeatherCard, { IAppProps as CardProps } from './components/WeatherCard';
import Highlights, {
  IAppProps as HighlightProps,
} from './components/Highlights';
import Footer from './components/Footer';
import { Location, LocationWeather, WeatherData } from './types';
import { getCurrentLocation, getWOEID, getWeatherByLocation } from './utils';

function App() {
  const [location, setLocation] = useState<Location>();
  const [woeid, setWoeid] = useState<string>();
  const [locationWeather, setLocationWeather] = useState<LocationWeather>();

  useEffect(() => {
    console.log(woeid);
    if (woeid) getWeatherByLocation({ woeid, setLocationWeather });
  }, [woeid]);

  useEffect(() => {
    console.log('location:', location);
    if (location) getWOEID({ location, setWoeid });
  }, [location]);

  useEffect(() => {
    getCurrentLocation({ setLocation });
  }, []);

  useEffect(() => {
    console.log(locationWeather);
  }, [locationWeather]);

  const panelProps: CurrentWeatherProps = {
    weather: {
      state: 'Showers',
      icon: showers,
    },
    temperature: 15,
    date: new Date(),
    location: 'Helsinki',
  };

  const cardProps: CardProps = {
    date: new Date(),
    weather: {
      state: 'Snow',
      icon: snow,
    },
    minTemperature: {
      celsius: 11,
      farenheit: 50,
    },
    maxTemperature: {
      celsius: 16,
      farenheit: 57,
    },
  };

  const highProps: HighlightProps = {
    windStatus: {
      speed: 7,
      direction: 'WSW',
    },
    humidity: 84,
    visibility: 6.4,
    airPressure: 998,
  };

  return (
    <div>
      <div className='sm:flex sm:flex-row'>
        <Panel {...panelProps} />
        <div className='flex-1 flex flex-col items-center mt-3 sm:ml-96'>
          <div
            style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}
            className='flex flex-row flex-wrap justify-center sm:justify-start mt-8 sm:mt-0 mx-auto'
          >
            <WeatherCard {...cardProps} />
            <WeatherCard {...cardProps} />
            <WeatherCard {...cardProps} />
            <WeatherCard {...cardProps} />
            <WeatherCard {...cardProps} />
          </div>
          <div style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}>
            <Highlights {...highProps} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
