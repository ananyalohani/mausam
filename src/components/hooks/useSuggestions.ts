import useSWR from 'swr';
import { CityData } from '../SearchPanel';

type UseSuggestions = (userInput: string) => CityData;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useSuggestions: UseSuggestions = (userInput) => {
  const val = userInput.split(' ').join('+');
  const url = `https://nominatim.openstreetmap.org/search/?city=${val}&format=json`;
  const { data, error } = useSWR(url, fetcher);

  return {
    data: data,
    status: !error && !data ? 'LOADING' : error ? 'ERROR' : 'OK',
    error: error,
  };
};

export default useSuggestions;
