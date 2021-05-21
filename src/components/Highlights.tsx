import React from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { DayWeather, Units, PressureUnitEnum } from '../types';
import CardLayout from './CardLayout';

export interface IAppProps {
  weather: DayWeather;
  units: Units;
}

export default function Highlights(props: IAppProps) {
  const speedUnit = props.units.speed;
  const windSpeed = props.weather.windSpeed[speedUnit];
  const distUnit = props.units.distance;
  const visibility = props.weather.visibility[distUnit];
  const pressureUnit = props.units.pressure;
  const airPressure = props.weather.airPressure[pressureUnit];

  return (
    <div className='p-6 mt-5 flex flex-col space-y-5 sm:mt-0'>
      <h1 className='text-center sm:text-left sm:text-2xl'>
        Today's Highlights
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <CardLayout
          title='Wind Status'
          bigText={windSpeed}
          smallText={speedUnit}
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
          bigText={visibility}
          smallText={distUnit}
        />
        <CardLayout
          title='Air Pressure'
          bigText={airPressure}
          smallText={PressureUnitEnum[pressureUnit]}
        />
      </div>
    </div>
  );
}
