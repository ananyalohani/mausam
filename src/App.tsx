import React, { useState, useEffect } from 'react';
import './App.css';
import Panel from './components/Panel';
import WeatherCard, { IAppProps as CardProps } from './components/WeatherCard';
import Highlights, {
  IAppProps as HighlightProps,
} from './components/Highlights';
import Footer from './components/Footer';
import { Location, LocationWeather, Weather, WeatherData } from './types';
import { getCurrentLocation, getWOEID, getWeatherByLocation } from './utils';

function App() {
  const [location, setLocation] = useState<Location>({
    latitude: 28.643999,
    longitude: 77.091003,
  });
  const [woeid, setWoeid] = useState<number>(28743736);
  const [locationWeather, setLocationWeather] = useState<LocationWeather>();
  const [today, setToday] = useState<WeatherData>();
  const [highProps, setHighProps] = useState<HighlightProps>({
    airPressure: { mbar: 0, pa: 0 },
    humidity: 0,
    visibility: { km: 0, miles: 0 },
    windDirection: '',
    windSpeed: { kmph: 0, mph: 0 },
  });

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
    setToday(locationWeather?.sixDayWeather[0]);
  }, [locationWeather]);

  useEffect(() => {
    today &&
      setHighProps({
        airPressure: today!.airPressure,
        humidity: today!.humidity,
        visibility: today!.visibility,
        windDirection: today!.windDirection,
        windSpeed: today!.windSpeed,
      });
  }, [today]);

  return (
    <div>
      <div className='sm:flex sm:flex-row'>
        <Panel {...locationWeather!} />
        <div className='flex-1 flex flex-col items-center mt-3 sm:ml-96'>
          <div
            style={{ width: window.innerWidth > 640 ? '80%' : '100%' }}
            className='flex flex-row flex-wrap justify-center sm:justify-start mt-8 sm:mt-0 mx-auto'
          >
            {locationWeather?.sixDayWeather.slice(1).map((day, key) => {
              return (
                <WeatherCard
                  key={key}
                  date={day.date}
                  icon={day.icon!}
                  minTemperature={day.minTemperature}
                  maxTemperature={day.maxTemperature}
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
