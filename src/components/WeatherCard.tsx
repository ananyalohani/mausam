import * as React from 'react';
import { Weather } from './Panel';
import { Temperature, dateString } from '../types';

export interface IAppProps {
  date: Date;
  weather: Weather;
  minTemperature: Temperature;
  maxTemperature: Temperature;
}

export default function App(props: IAppProps) {
  return (
    <div className='bg-secondary rounded-md flex flex-col items-center justify-around p-5 w-38 m-4 space-y-5'>
      <p>{dateString(props.date)}</p>
      <img className='block w-20' src={props.weather.icon} />
      <div className='w-full flex flex-row justify-between'>
        <p>{props.minTemperature.celsius}°C</p>
        <p className='opacity-50'>{props.maxTemperature.celsius}°C</p>
      </div>
    </div>
  );
}
