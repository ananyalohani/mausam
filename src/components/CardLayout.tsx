import React from 'react';

export interface IAppProps {
  title: string;
  bigText: string | number;
  smallText: string;
  children?: React.ReactNode;
}

export default function CardLayout(props: IAppProps) {
  return (
    <div className='bg-secondary flex flex-col items-center p-8 rounded-md space-y-5 sm:flex-1 sm:w-30 sm:p-5'>
      <h2 className='sm:text-base'>{props.title}</h2>
      <div className='pb-3 '>
        <h1 className='text-8xl sm:text-6xl font-bold inline'>
          {props.bigText}
        </h1>
        <h1 className='text-5xl sm:text-3xl font-light inline'>
          {props.smallText}
        </h1>
      </div>
      {props.children}
    </div>
  );
}
