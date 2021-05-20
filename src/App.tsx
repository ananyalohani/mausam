import React, { useState, useEffect } from 'react';
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
import Search from './components/Search';

function App() {
  const [location, setLocation] = useState<Location>({
    latitude: 28.643999,
    longitude: 77.091003,
  });
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
    if (location) getWeatherByLocation({ location, setLocationWeather });
  }, [location]);

  const onLocationClick = () => {
    setLoading(true);
    const prevLoc = location;
    getCurrentLocation({ setLocation });
    if (
      location.latitude === prevLoc.latitude &&
      location.longitude === prevLoc.longitude
    )
      setLoading(false);
  };

  useEffect(() => {
    setToday(locationWeather?.sixDayWeather[0]);
    setLoading(false);
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

  const handleSelect = async (props: Location) => {
    getWeatherByLocation({ props, setLocationWeather });
  };

  const [searchBar, setSearchBar] = useState<'hidden' | ''>('hidden');

  useEffect(() => {
    console.log(searchBar);
  }, [searchBar]);

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
          setSearchBar={setSearchBar}
        />
        <Search
          onHandleSelect={handleSelect}
          status={searchBar}
          setStatus={setSearchBar}
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
