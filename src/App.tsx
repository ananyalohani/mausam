import React from 'react';
import logo from './logo.svg';
import './App.css';
import Panel, { IAppProps as CurrentWeatherProps } from './components/Panel';
import clear from './assets/images/clear.png';
import hail from './assets/images/hail.png';
import light_rain from './assets/images/light_rain.png';
import sleet from './assets/images/sleet.png';
import snow from './assets/images/snow.png';
import heavy_cloud from './assets/images/heavy_cloud.png';
import showers from './assets/images/shower.png';
import light_cloud from './assets/images/light_cloud.png';
import thunderstorm from './assets/images/thunderstorm.png';
import heavy_rain from './assets/images/heavy_rain.png';
import WeatherCard, { IAppProps as CardProps } from './components/WeatherCard';
import Highlights, {
  IAppProps as HighlightProps,
} from './components/Highlights';
import Footer from './components/Footer';

function App() {
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
        <div className='flex-1 flex flex-col items-center mt-3'>
          <div
            style={{ width: window.innerWidth > 640 ? '80%' : '90%' }}
            className='grid grid-cols-2 sm:grid-cols-5 mt-8 sm:mt-0 mx-auto'
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
