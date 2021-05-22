import React from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { DayWeather, TempUnitEnum, TemperatureUnit } from '../types';
import { withStyles, Theme, Tooltip } from '@material-ui/core';
import cloud_bg from '../assets/images/cloud_background.png';

export interface DefaultPanelProps {
  weather: DayWeather;
  location: string;
  onLocationClick: any;
  togglePanel: any;
  temperatureUnit: TemperatureUnit;
}

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f2f2f7c9',
    color: '#100E1D',
    boxShadow: theme.shadows[1],
    fontFamily: 'Fira Sans',
    fontSize: 12,
  },
}))(Tooltip);

export default function DefaultPanel(props: DefaultPanelProps) {
  return (
    <>
      <div className='flex justify-between w-full'>
        <button onClick={() => props.togglePanel()} className='btn'>
          <GoSearch className='btn-icon' />
          Search by Location
        </button>
        <LightTooltip title="Your current location's forecast">
          <button onClick={props.onLocationClick} className='round-btn'>
            <BiCurrentLocation className='h-6 w-6 text-white' />
          </button>
        </LightTooltip>
      </div>
      <div className='absolute h-100 w-full sm:max-w-sm overflow-hidden'>
        <div className='flex justify-center w-full'>
          <img src={cloud_bg} alt='' className='max-w-xl opacity-5 mt-10' />
        </div>
      </div>
      <div className='flex flex-col items-center justify-around flex-1 mt-20'>
        <img
          src={props.weather.icon}
          alt='weather icon'
          className='relative self-center'
          style={{ maxWidth: '10rem' }}
        />
        <div className='flex flex-col space-y-20 items-center'>
          <div>
            <h1 className='text-9xl font-medium inline'>
              {props.weather.temperature[props.temperatureUnit]}
            </h1>
            <h1 className='text-5xl font-medium inline opacity-60'>
              {TempUnitEnum[props.temperatureUnit]}
            </h1>
          </div>
          <h1 className='text-4xl font-semibold inline opacity-60'>
            {props.weather.weatherState}
          </h1>
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex flex-row space-x-3 opacity-50'>
              <p>Today</p>
              <p>·</p>
              <p>{props.weather.dateString}</p>
            </div>
            <div className='flex flex-row space-x-2 items-center opacity-50'>
              <IoLocationSharp className='h-6 w-6 text-white' />
              <p className='font-medium'>{props.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
