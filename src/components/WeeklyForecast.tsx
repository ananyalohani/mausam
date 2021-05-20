import * as React from 'react';
import { DayWeather } from '../types';
import WeatherCard from './WeatherCard';

interface WeekProps {
  weekWeather: Array<DayWeather>;
}

export default function WeeklyForecast(props: WeekProps) {
  return (
    <div className='p-6 mt-5 flex flex-col space-y-5 sm:mt-0'>
      <h1 className='text-center sm:text-left sm:text-2xl '>
        This Week's Forecast
      </h1>
      <div className='flex flex-row flex-wrap justify-center sm:justify-start mt-8 sm:mt-0 mx-auto'>
        {props.weekWeather.map((day, key) => {
          return (
            <WeatherCard
              key={key}
              dateString={day.dateString!}
              icon={day.icon!}
              weatherState={day.weatherState}
              minTemperature={day.minTemperature}
              maxTemperature={day.maxTemperature}
            />
          );
        })}
      </div>
    </div>
  );
}
