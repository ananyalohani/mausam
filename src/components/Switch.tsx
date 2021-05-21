import React from 'react';
import Switch from 'react-switch';

export interface ISwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  leftOption: string;
  rightOption: string;
}

export default function CustomSwitch(props: ISwitchProps) {
  return (
    <div>
      <label className='flex flex-row space-x-1 items-center'>
        <span className='mr-1 sm:text-sm'>{props.leftOption}</span>
        <Switch
          onChange={props.onChange}
          checked={props.checked}
          onColor='#5E3A5F'
          offColor='#5E3A5F'
          onHandleColor='#A6536E'
          offHandleColor='#A6536E'
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
          height={10}
          width={35}
          className='react-switch'
          id='material-switch'
        />
        <span className='ml-1 sm:text-sm'>{props.rightOption}</span>
      </label>
    </div>
  );
}
