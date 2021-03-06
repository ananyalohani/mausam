import React, { useState } from 'react';
import DefaultPanel from './DefaultPanel';
import SearchPanel from './SearchPanel';
import { Location, DayWeather, TemperatureUnit } from '../types';
import '../index.css';

interface PanelProps {
  location: string;
  weather: DayWeather;
  onLocationClick: any;
  temperatureUnit: TemperatureUnit;
  handleSelect: (props: Location) => void;
}

export default function Panel(props: PanelProps) {
  const [panelType, setPanelType] = useState<'default' | 'search'>('default');

  const togglePanel = () => {
    panelType === 'default' ? setPanelType('search') : setPanelType('default');
  };

  return (
    <div className='bg-secondary overflow-auto h-screen w-full sm:fixed sm:max-w-sm p-5 flex flex-col items-center'>
      {panelType === 'default' ? (
        <DefaultPanel
          location={props.location}
          weather={props.weather}
          onLocationClick={props.onLocationClick}
          temperatureUnit={props.temperatureUnit}
          togglePanel={togglePanel}
        />
      ) : (
        <SearchPanel
          handleSelect={props.handleSelect}
          togglePanel={togglePanel}
        />
      )}
    </div>
  );
}
