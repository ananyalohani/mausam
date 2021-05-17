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
    <div className='p-6 mt-5'>
      <h1 className='mb-5'>Today's Highlights</h1>
      <CardLayout>
        <h2>Wind Status</h2>
        <div>
          <h1 className='text-8xl font-bold inline'>
            {props.windStatus.speed}
          </h1>
          <h1 className='text-5xl font-medium inline'>mph</h1>
        </div>
        <div className='flex flex-row space-x-3 pt-2'>
          <div className='bg-button p-1 rounded-full '>
            <TiLocationArrow className='h-5 w-5 text-white fill-current' />
          </div>
          <p>{props.windStatus.direction}</p>
        </div>
      </CardLayout>
      <CardLayout>
        <h2>Humidity</h2>
        <div>
          <h1 className='text-8xl font-bold inline'>{props.humidity}</h1>
          <h1 className='text-5xl font-light inline'>%</h1>
        </div>
        <div className=' pt-1'>
          <div className='h-2 mb-4 rounded bg-yellow-200'>
            <div
              style={{ width: props.humidity + '%' }}
              className='bg-yellow-500'
            ></div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}
