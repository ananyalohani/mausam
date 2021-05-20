import * as React from 'react';
import { DefaultPanelProps } from './Panel';
import { BiCurrentLocation } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import cloud_bg from '../assets/images/cloud_background.png';
import Spinner from './Spinner';

export default function DefaultPanel(props: DefaultPanelProps) {
  return (
    <>
      <div className='flex justify-between w-full'>
        <button onClick={() => props.togglePanel()} className='btn'>
          Search by Location
        </button>
        <button onClick={props.onLocationClick} className='round-btn'>
          <BiCurrentLocation className='h-6 w-6 text-white' />
        </button>
      </div>
      <div className='absolute h-100 w-full sm:max-w-sm overflow-hidden'>
        <div className='w-min'>
          <img src={cloud_bg} className='max-w-xl opacity-5 mt-10 -ml-20' />
        </div>
      </div>
      <div className='flex flex-col items-center justify-around flex-1 mt-20'>
        {!props.loading &&
        props.icon &&
        props.temperature &&
        props.dateString ? (
          <>
            <img
              src={props.icon}
              className='relative self-center'
              style={{ maxWidth: '10rem' }}
            />
            <div className='flex flex-col space-y-20 items-center'>
              <div>
                <h1 className='text-9xl font-medium inline'>
                  {props.temperature.celsius}
                </h1>
                <h1 className='text-5xl font-medium inline opacity-60'>°C</h1>
              </div>
              <h1 className='text-4xl font-semibold inline opacity-60'>
                {props.weatherState}
              </h1>
              <div className='flex flex-col items-center space-y-3'>
                <div className='flex flex-row space-x-3 opacity-50'>
                  <p>Today</p>
                  <p>·</p>
                  <p>{props.dateString}</p>
                </div>
                <div className='flex flex-row space-x-2 items-center opacity-50'>
                  <IoLocationSharp className='h-6 w-6 text-white' />
                  <p className='font-medium'>{props.location}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Spinner size={40} />
        )}
      </div>
    </>
  );
}