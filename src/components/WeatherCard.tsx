import * as React from 'react';
import { Temperature, dateString } from '../types';

export interface IAppProps {
  date: Date;
  icon: string;
  minTemperature: Temperature;
  maxTemperature: Temperature;
}

export default function App(props: IAppProps) {
  return (
    <div className='bg-secondary rounded-md flex flex-col items-center justify-around p-6 sm:flex-auto sm:p-5 w-38 m-4 space-y-5 lg:flex-none xl:flex-auto'>
      <p className='sm:text-sm'>{dateString(props.date)}</p>
      <img className='block w-20' src={props.icon} />
      <div className='w-full flex flex-row justify-between'>
        <p className='sm:text-sm'>{props.maxTemperature.celsius}°C</p>
        <p className='sm:text-sm opacity-50'>
          {props.minTemperature.celsius}°C
        </p>
      </div>
    </div>
  );
}
