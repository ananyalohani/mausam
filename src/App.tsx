import React, { useState, useEffect } from 'react';
import Panel from './components/Panel';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import WeeklyForecast from './components/WeeklyForecast';
import SpinnerPage from './components/SpinnerPage';
import useForecast from './components/hooks/useForecast';
import logo from './assets/logos/logo_expanded_nobg.png';
import Settings from './components/Settings';
import ErrorPage from './components/Error';
import { Location, Units } from './types';
import { getCurrentLocation } from './utils';

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
  if (status === 'ERROR') return <ErrorPage />;
  else
    return (
      <div>
        <div className='sm:flex sm:flex-row'>
          <Panel
            location={forecastData?.location!}
            weather={forecastData?.sixDayWeather[0]!}
            onLocationClick={onLocationClick}
            handleSelect={handleSelect}
            temperatureUnit={units.temperature}
          />
          <div className='flex-1 flex flex-col items-center mt-3 sm:ml-96'>
            <div
              style={{ width: '80%' }}
              className='flex flex-col sm:flex-row justify-start sm:justify-between'
            >
              <img src={logo} className='sm:mb-8' />
              <Settings units={units} setUnits={setUnits} />
            </div>
            <div style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}>
              <WeeklyForecast
                weekWeather={forecastData?.sixDayWeather.slice(1)!}
                temperatureUnit={units.temperature}
              />
              <Highlights
                weather={forecastData?.sixDayWeather[0]!}
                units={units}
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
}

export default App;
