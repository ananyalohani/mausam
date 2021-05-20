import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Location } from '../types';
import '../index.css';
// import useSWR from 'swr';

interface Props {
  onHandleSelect: (props: Location) => void;
  status: string;
  setStatus: any;
}

// This was taken and modified from use-places-autocomplete github example
export default function Search(props: Props) {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: any) =>
    async () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address: description });
        const { lat, lng } = await getLatLng(results[0]);
        const p: Location = {
          latitude: lat,
          longitude: lng,
        };
        console.log(p);
        props.onHandleSelect(p);
      } catch (err) {
        console.log('😱 Error: ', err);
      }
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      console.log(suggestion);
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className='z-50' key={place_id} onClick={handleSelect(suggestion)}>
          <p>{main_text}</p>
        </li>
      );
    });

  return (
    <div
      className={
        'bg-secondary h-screen w-full sm:fixed sm:max-w-sm p-5 flex flex-col items-center z-50 ' +
        props.status
      }
    >
      <div className='flex flex-col w-full' ref={ref}>
        <div className='flex flex-row justify-around w-full'>
          <button onClick={() => props.setStatus('hidden')} className='btn'>
            Back
          </button>
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder='Enter your city...'
            className='w-60 bg-primary p-3 rounded ring-1 ring-secondaryLight focus:outline-none disabled:opacity-70'
          />
        </div>
        {status === 'OK' && (
          <ul className='divide-y divide-secondaryLight'>
            {renderSuggestions()}
          </ul>
        )}
      </div>
    </div>
  );
}
