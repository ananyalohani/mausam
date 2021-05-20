import React, { useState } from 'react';
import DefaultPanel from './DefaultPanel';
import SearchPanel from './SearchPanel';
import { Location, Temperature } from '../types';
import '../index.css';

export interface DefaultPanelProps {
  location: string;
  weatherState: string;
  icon: string;
  dateString: string;
  temperature: Temperature;
  loading: boolean;
  onLocationClick: any;
  togglePanel: any;
}

interface PanelProps {
  location: string;
  weatherState: string;
  icon: string;
  dateString: string;
  temperature: Temperature;
  loading: boolean;
  onLocationClick: any;
  handleSelect: (props: Location) => void;
}

export default function Panel(props: PanelProps) {
  const [panelType, setPanelType] = useState<'default' | 'search'>('default');

  const togglePanel = () => {
    panelType === 'default' ? setPanelType('search') : setPanelType('default');
  };

  return (
    <div className='bg-secondary h-screen w-full sm:fixed sm:max-w-sm p-5 flex flex-col items-center'>
      {panelType === 'default' ? (
        <DefaultPanel
          location={props.location}
          weatherState={props.weatherState}
          icon={props.icon}
          dateString={props.dateString}
          temperature={props.temperature}
          loading={props.loading}
          onLocationClick={props.onLocationClick}
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
