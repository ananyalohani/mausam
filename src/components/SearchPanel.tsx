import React, { useState, useEffect } from 'react';
import { Location } from '../types';
import useSuggestions from './hooks/useSuggestions';

export interface ISearchProps {
  handleSelect: (props: Location) => void;
  togglePanel: () => void;
}

export interface CityData {
  data: Array<any>;
  status: string;
  error: any;
}

export default function Search(props: ISearchProps) {
  const [value, setValue] = useState<string>('');

  const { data, status, error } = useSuggestions(value);

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const loc: Location = {
        latitude: parseFloat(suggestion.lat),
        longitude: parseFloat(suggestion.lon),
      };
      return (
        <li
          style={{ width: '90%' }}
          className='z-50 cursor-pointer hover:bg-primary hover:bg-opacity-30 p-3 transition-all'
          key={suggestion.place_id}
          onClick={() => props.handleSelect(loc)}
        >
          <p className='text-sm'>{suggestion.display_name}</p>
        </li>
      );
    });

  return (
    <div className='flex flex-col w-full '>
      <div className='flex flex-row justify-around w-full mb-3'>
        <button onClick={props.togglePanel} className='btn'>
          Back
        </button>
        <input
          onChange={handleInput}
          placeholder='Enter a city...'
          className='w-60 bg-primary p-3 rounded ring-1 ring-secondaryLight focus:ring-subtleAccent focus:outline-none disabled:opacity-70'
        />
      </div>
      {status === 'OK' && (
        <ul className='divide-y divide-secondaryLight flex flex-col items-center'>
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}
