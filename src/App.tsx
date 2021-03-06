import React, { useState } from 'react';
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
import { BiCodeAlt } from 'react-icons/bi';

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
  if (status === 'ERROR') {
    console.error(error);
    return <ErrorPage />;
  }
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
            className='flex flex-col lg:flex-row items-center md:items-start lg:items-center lg:justify-between'
          >
            <img src={logo} alt='mausam logo' className='sm:mb-8 max-w-xs' />
            <div className='flex flex-row items-center mt-3 sm:mt-0 space-x-3 lg:mr-5 md:ml-5 md:mb-5'>
              <Settings units={units} setUnits={setUnits} />
              <button className='btn self-center ' type='button'>
                <a
                  href='https://github.com/ananyalohani/mausam/'
                  target='_blank'
                  rel='noreferrer'
                  className='flex flex-row items-center'
                >
                  <BiCodeAlt className='btn-icon flex-initial' />
                  Code
                </a>
              </button>
            </div>
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
