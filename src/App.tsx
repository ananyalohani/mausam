import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import Panel from './components/Panel';
import WeatherCard from './components/WeatherCard';
import Highlights, {
  IAppProps as HighlightProps,
} from './components/Highlights';
import Footer from './components/Footer';
import { Location, LocationWeather, WeatherData } from './types';
import { getCurrentLocation, getWOEID, getWeatherByLocation } from './utils';
import logo from './assets/logos/logo_expanded_nobg.png';

function App() {
  const [location, setLocation] = useState<Location>({
    latitude: 28.643999,
    longitude: 77.091003,
  });
  const [woeid, setWoeid] = useState<number>(28743736);
  const [locationWeather, setLocationWeather] = useState<LocationWeather>();
  const [today, setToday] = useState<WeatherData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [highProps, setHighProps] = useState<HighlightProps>({
    airPressure: { mbar: 0, pa: 0 },
    humidity: 0,
    visibility: { km: 0, miles: 0 },
    windDirection: '',
    windSpeed: { kmph: 0, mph: 0 },
    windDirectionAngle: 0,
    loading: loading,
  });

  useEffect(() => {
    console.log(woeid);
    if (woeid) getWeatherByLocation({ woeid, setLocationWeather });
  }, [woeid]);

  useEffect(() => {
    console.log('location:', location);
    if (location) getWOEID({ location, setWoeid });
  }, [location]);

  const onLocationClick = () => {
    setLoading(true);
    const prevLoc = location;
    getCurrentLocation({ setLocation });
    if (location === prevLoc) setLoading(false);
  };

  useEffect(() => {
    console.log(locationWeather);
    setToday(locationWeather?.sixDayWeather[0]);
    setLoading(false);
    console.log(loading);
  }, [locationWeather]);

  useEffect(() => {
    today &&
      setHighProps({
        airPressure: today!.airPressure,
        humidity: today!.humidity,
        visibility: today!.visibility,
        windDirection: today!.windDirection,
        windSpeed: today!.windSpeed,
        windDirectionAngle: today!.windDirectionAngle,
        loading: loading,
      });
  }, [today]);

  return (
    <div>
      <div className='sm:flex sm:flex-row'>
        <Panel
          dateString={today?.dateString!}
          loading={loading}
          icon={today?.icon!}
          location={locationWeather?.location!}
          onLocationClick={onLocationClick}
          temperature={today?.temperature!}
          weatherState={today?.weatherState!}
        />
        <div className='flex-1 flex flex-col items-center mt-3 sm:ml-96'>
          <div
            style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}
            className='flex justify-items-end'
          >
            <img src={logo} />
          </div>
          <div
            style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}
            className='flex flex-row flex-wrap justify-center sm:justify-start mt-8 sm:mt-0 mx-auto'
          >
            {locationWeather?.sixDayWeather.slice(1).map((day, key) => {
              return (
                <WeatherCard
                  key={key}
                  dateString={day.dateString!}
                  icon={day.icon!}
                  weatherState={day.weatherState}
                  minTemperature={day.minTemperature}
                  maxTemperature={day.maxTemperature}
                  loading={loading}
                />
              );
            })}
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
