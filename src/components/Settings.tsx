import React, { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { Popper, ClickAwayListener } from '@material-ui/core';
import { Units } from '../types';
import Switch from './Switch';

// TODO
// - Add arrow to pointer
// - Add mui tooltip to current location button
// - Try SWR and check if there's CORS BT
// - Refactor code better
// - Make README

export interface ISettingsProps {
  units: Units;
  setUnits: any;
}

export default function Settings(props: ISettingsProps) {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleClick = (e: any) => setAnchor(anchor ? null : e.currentTarget);
  const handleClickAway = () => setAnchor(null);

  const handleChangeTempUnit = (checked: boolean) =>
    props.setUnits({
      ...props.units,
      temperature: checked ? 'farenheit' : 'celsius',
    });

  const handleChangeSpeedUnit = (checked: boolean) =>
    props.setUnits({
      ...props.units,
      speed: checked ? 'mph' : 'kmph',
    });

  const handleChangeDistanceUnit = (checked: boolean) =>
    props.setUnits({
      ...props.units,
      distance: checked ? 'miles' : 'km',
    });

  const handleChangePressureUnit = (checked: boolean) =>
    props.setUnits({
      ...props.units,
      pressure: checked ? 'pa' : 'mbar',
    });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className='self-center sm:mt-0 mt-2'>
        <button className='btn sm:mr-6' type='button' onClick={handleClick}>
          <MdSettings className='btn-icon flex-initial' />
          Settings
        </button>
        <Popper
          open={open}
          anchorEl={anchor}
          className='popper bg-secondary mt-2 z-10 p-5 pb-6 border-solid border-secondaryLight rounded'
        >
          <h6>Select the units:</h6>
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <Switch
              onChange={handleChangeTempUnit}
              checked={props.units.temperature === 'farenheit'}
              leftOption='°C'
              rightOption='°F'
            />
            <Switch
              onChange={handleChangeSpeedUnit}
              checked={props.units.speed === 'mph'}
              leftOption='kmph'
              rightOption='mph'
            />
            <Switch
              onChange={handleChangeDistanceUnit}
              checked={props.units.distance === 'miles'}
              leftOption='km'
              rightOption='miles'
            />
            <Switch
              onChange={handleChangePressureUnit}
              checked={props.units.pressure === 'pa'}
              leftOption='mbar'
              rightOption='pa'
            />
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
