import React, { useState, useEffect } from 'react';
import Panel from './components/Panel';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import WeeklyForecast from './components/WeeklyForecast';
import SpinnerPage from './components/SpinnerPage';
import useForecast from './components/hooks/useForecast';
import logo from './assets/logos/logo_expanded_nobg.png';
import Settings from './components/Settings';
import { Location, Units } from './types';
import { getCurrentLocation } from './utils';
import './App.css';

function App() {
  const [location, setLocation] = useState<Location>({
    latitude: 28.643999,
    longitude: 77.091003,
  });

  const { data: forecastData, status, error } = useForecast(location);

  const onLocationClick = () => {
    getCurrentLocation({ setLocation });
  };

  const handleSelect = (loc: Location) => {
    setLocation(loc);
  };

  const [units, setUnits] = useState<Units>({
    speed: 'kmph',
    distance: 'km',
    temperature: 'celsius',
    pressure: 'mbar',
  });

  if (status === 'LOADING') return <SpinnerPage />;
  else
    return (
      <div>
        <div className='sm:flex sm:flex-row'>
          <Panel
            location={forecastData?.location!}
            weather={forecastData?.sixDayWeather[0]!}
            onLocationClick={onLocationClick}
            handleSelect={handleSelect}
          />
          <div className='flex-1 flex flex-col items-center mt-3 sm:ml-96'>
            <div
              style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}
              className='flex justify-center sm:justify-between'
            >
              <img src={logo} className='sm:mb-8' />
              <Settings units={units} setUnits={setUnits} />
            </div>
            <div style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}>
              <WeeklyForecast
                weekWeather={forecastData?.sixDayWeather.slice(1)!}
              />
              <Highlights weather={forecastData?.sixDayWeather[0]!} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
}

export default App;
