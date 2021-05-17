import * as React from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import cloud_bg from '../assets/images/cloud_background.png';

export interface Weather {
  state: string;
  icon: string;
}

export interface CurrentWeatherProps {
  weather: Weather;
  temperature: number;
  date: Date;
  location: string;
}

export default function Panel(props: CurrentWeatherProps) {
  const dateString = (date: string): string => {
    const arr = date.split(' ');
    return arr[0] + ', ' + arr[2] + ' ' + arr[1];
  };

  return (
    <div className='bg-secondary h-screen w-full sm:max-w-sm p-5 flex flex-col items-center'>
      <div className='flex justify-between w-full'>
        <button className='bg-button p-3 font-body rounded-md shadow-md font-medium'>
          Search for places
        </button>
        <div className='bg-button p-3 rounded-full shadow-md'>
          <BiCurrentLocation className='h-6 w-6 text-white' />
        </div>
      </div>
      <div className='absolute h-100 w-full sm:max-w-sm overflow-hidden'>
        <div className='w-min'>
          <img src={cloud_bg} className='max-w-xl opacity-5 mt-10 -ml-20' />
        </div>
      </div>
      <div className='flex flex-col items-center justify-around flex-1 mt-20'>
        <img
          src={props.weather.icon}
          className='relative self-center'
          style={{ maxWidth: '10rem' }}
        />
        <div className='flex flex-col space-y-20 items-center'>
          <div>
            <h1 className='text-9xl font-medium inline'>{props.temperature}</h1>
            <h1 className='text-5xl font-medium inline opacity-60'>°C</h1>
          </div>
          <h1 className='text-4xl font-semibold inline opacity-60'>
            {props.weather.state}
          </h1>
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex flex-row space-x-3 opacity-50'>
              <p>Today</p>
              <p>·</p>
              <p>{dateString(props.date + '')}</p>
            </div>
            <div className='flex flex-row space-x-2 items-center opacity-50'>
              <IoLocationSharp className='h-6 w-6 text-white' />
              <p className='font-medium'>{props.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
