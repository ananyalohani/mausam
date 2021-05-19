import * as React from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { Distance, Pressure, Speed } from '../types';
import CardLayout from './CardLayout';

export interface IAppProps {
  windSpeed: Speed;
  humidity: number;
  visibility: Distance;
  airPressure: Pressure;
  windDirection: string;
  windDirectionAngle: number;
  loading: boolean;
}

export default function Highlights(props: IAppProps) {
  return (
    <div className='p-6 mt-5 flex flex-col space-y-5 sm:mt-0'>
      <h1 className='text-center sm:text-left sm:text-2xl'>
        Today's Highlights
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {props.windSpeed && (
          <CardLayout
            title='Wind Status'
            bigText={props.windSpeed.kmph + ''}
            smallText='kmph'
            loading={props.loading}
          >
            <div className='flex flex-row space-x-3'>
              {!props.loading && (
                <div className='bg-subtleAccent p-1 rounded-full '>
                  <TiLocationArrow
                    style={{
                      transform: `rotate(${props.windDirectionAngle}deg)`,
                    }}
                    className='h-5 w-5 text-white fill-current transition-all'
                  />
                </div>
              )}
              <p>{props.windDirection}</p>
            </div>
          </CardLayout>
        )}
        {props.humidity >= 0 && (
          <CardLayout
            title='Humidity'
            bigText={props.humidity}
            smallText='%'
            loading={props.loading}
          >
            {!props.loading && (
              <div className='w-full font-light'>
                <div className='flex flex-row justify-between'>
                  <p>0</p>
                  <p>50</p>
                  <p>100</p>
                </div>
                <div className='h-2 rounded bg-white overflow-hidden'>
                  <div
                    style={{ width: props.humidity + '%' }}
                    className='h-full bg-yellow-300'
                  ></div>
                </div>
                <p className='float-right'>%</p>
              </div>
            )}
          </CardLayout>
        )}
        {props.visibility && (
          <CardLayout
            title='Visibility'
            bigText={props.visibility.km + ''}
            smallText='km'
            loading={props.loading}
          />
        )}
        {props.airPressure && (
          <CardLayout
            title='Air Pressure'
            bigText={props.airPressure.mbar}
            smallText='mb'
            loading={props.loading}
          />
        )}
      </div>
    </div>
  );
}
