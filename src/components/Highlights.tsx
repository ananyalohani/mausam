import * as React from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { DayWeather } from '../types';
import CardLayout from './CardLayout';

export interface IAppProps {
  weather: DayWeather;
}

export default function Highlights(props: IAppProps) {
  return (
    <div className='p-6 mt-5 flex flex-col space-y-5 sm:mt-0'>
      <h1 className='text-center sm:text-left sm:text-2xl'>
        Today's Highlights
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <CardLayout
          title='Wind Status'
          bigText={props.weather.windSpeed.kmph + ''}
          smallText='kmph'
        >
          <div className='flex flex-row space-x-3'>
            <div className='bg-subtleAccent p-1 rounded-full '>
              <TiLocationArrow
                style={{
                  transform: `rotate(${props.weather.windDirectionAngle}deg)`,
                }}
                className='h-5 w-5 text-white fill-current transition-all'
              />
            </div>
            <p>{props.weather.windDirection}</p>
          </div>
        </CardLayout>
        <CardLayout
          title='Humidity'
          bigText={props.weather.humidity}
          smallText='%'
        >
          <div className='w-full font-light'>
            <div className='flex flex-row justify-between'>
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className='h-2 rounded bg-white overflow-hidden'>
              <div
                style={{ width: props.weather.humidity + '%' }}
                className='h-full bg-yellow-300'
              ></div>
            </div>
            <p className='float-right'>%</p>
          </div>
        </CardLayout>
        <CardLayout
          title='Visibility'
          bigText={props.weather.visibility.km + ''}
          smallText='km'
        />
        <CardLayout
          title='Air Pressure'
          bigText={props.weather.airPressure.mbar}
          smallText='mb'
        />
      </div>
    </div>
  );
}
