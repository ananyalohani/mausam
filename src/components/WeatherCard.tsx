import React from 'react';
import { Temperature, TempUnitEnum, TemperatureUnit } from '../types';

export interface IAppProps {
  dateString: string;
  icon: string;
  weatherState: string;
  minTemperature: Temperature;
  maxTemperature: Temperature;
  temperatureUnit: TemperatureUnit;
}

export default function WeatherCard(props: IAppProps) {
  const minTemp = props.minTemperature[props.temperatureUnit];
  const maxTemp = props.maxTemperature[props.temperatureUnit];
  const unit = TempUnitEnum[props.temperatureUnit];

  return (
    <div className='bg-secondary rounded-md flex flex-col items-center justify-around p-6 sm:flex-auto sm:p-5 sm:px-6 w-38 m-3 space-y-3 lg:flex-none xl:flex-auto '>
      <p className='sm:text-sm'>{props.dateString}</p>
      <img className='block w-20' alt='weather icon' src={props.icon} />
      <p className='sm:text-sm font-medium'>{props.weatherState}</p>
      <div className='w-full flex flex-row justify-between'>
        <p className='sm:text-sm'>
          {maxTemp}
          {unit}
        </p>
        <p className='sm:text-sm opacity-50'>
          {minTemp}
          {unit}
        </p>
      </div>
    </div>
  );
}
