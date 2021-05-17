import * as React from 'react';

export interface IAppProps {
  children?: React.ReactNode;
}

export default function CardLayout(props: IAppProps) {
  return (
    <div className='bg-secondary flex flex-col items-center p-8 rounded-md space-y-5'>
      {props.children}
    </div>
  );
}
