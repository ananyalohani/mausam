import * as React from 'react';
import { Temperature, Units } from '../types';

export interface IAppProps {
  dateString: string;
  icon: string;
  weatherState: string;
  minTemperature: Temperature;
  maxTemperature: Temperature;
}

export default function WeatherCard(props: IAppProps) {
  return (
    <div className='bg-secondary rounded-md flex flex-col items-center justify-around p-6 sm:flex-auto sm:p-5 w-38 m-4 space-y-3 lg:flex-none xl:flex-auto'>
      <p className='sm:text-sm'>{props.dateString}</p>
      <img className='block w-20' src={props.icon} />
      <p className='sm:text-sm'>{props.weatherState}</p>
      <div className='w-full flex flex-row justify-between'>
        <p className='sm:text-sm'>{props.maxTemperature.celsius}°C</p>
        <p className='sm:text-sm opacity-50'>
          {props.minTemperature.celsius}°C
        </p>
      </div>
    </div>
  );
}
