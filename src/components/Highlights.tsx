import * as React from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import CardLayout from './CardLayout';

export interface IAppProps {
  windStatus: {
    speed: number;
    direction: string;
  };
  humidity: number;
  visibility: number;
  airPressure: number;
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
          bigText={props.windStatus.speed}
          smallText='kmph'
        >
          <div className='flex flex-row space-x-3'>
            <div className='bg-button p-1 rounded-full '>
              <TiLocationArrow className='h-5 w-5 text-white fill-current' />
            </div>
            <p>{props.windStatus.direction}</p>
          </div>
        </CardLayout>
        <CardLayout title='Humidity' bigText={props.humidity} smallText='%'>
          <div className='w-full font-light'>
            <div className='flex flex-row justify-between'>
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className='h-2 rounded bg-yellow-100 overflow-hidden'>
              <div
                style={{ width: props.humidity + '%' }}
                className='h-full rounded bg-yellow-300'
              ></div>
            </div>
            <p className='float-right'>%</p>
          </div>
        </CardLayout>
        <CardLayout
          title='Visibility'
          bigText={props.visibility}
          smallText='km'
        />
        <CardLayout
          title='Air Pressure'
          bigText={props.airPressure}
          smallText='mb'
        />
      </div>
    </div>
  );
}
