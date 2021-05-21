import useSWR from 'swr';
import { Location, DayWeather, Forecast, LoadStatus } from '../../types';
import {
  fetcher,
  dateString,
  roundVal,
  milesToKm,
  mbarToPa,
  celsiusToFarenheit,
  assignIcon,
} from '../../utils';

interface LocationWeather {
  data: Forecast;
  status: LoadStatus;
  error: any;
}

type UseForecast = (location: Location) => LocationWeather;

const useForecast: UseForecast = (location) => {
  const baseURL =
    'https://tranquil-brook-69806.herokuapp.com/https://www.metaweather.com/';

  let lat = location.latitude;
  let long = location.longitude;

  const woeidURL = baseURL + `api/location/search/?lattlong=${lat},${long}`;

  const { data: locationData, error: locationError } = useSWR(
    woeidURL,
    fetcher
  );

  const { data, error } = useSWR(
    locationData ? baseURL + `api/location/${locationData[0].woeid}` : null,
    fetcher
  );

  const forecastData: Forecast = { location: '', sixDayWeather: [] };
  if (data) {
    forecastData.location = data.title;
    data.consolidated_weather.map((item: any) => {
      const dict: DayWeather = {
        date: new Date(item.applicable_date),
        weatherState: item.weather_state_name,
        weatherStateAbbr: item.weather_state_abbr,
        windDirectionAngle: item.wind_direction,
        windDirection: item.wind_direction_compass,
        humidity: roundVal(item.humidity),
        icon: assignIcon(item.weather_state_abbr),
        windSpeed: {
          mph: roundVal(item.wind_speed),
          kmph: roundVal(milesToKm(item.wind_speed)),
        },
        visibility: {
          miles: roundVal(item.visibility),
          km: roundVal(milesToKm(item.visibility)),
        },
        temperature: {
          celsius: roundVal(item.the_temp),
          farenheit: roundVal(celsiusToFarenheit(item.the_temp)),
        },
        minTemperature: {
          celsius: roundVal(item.min_temp),
          farenheit: roundVal(celsiusToFarenheit(item.min_temp)),
        },
        maxTemperature: {
          celsius: roundVal(item.max_temp),
          farenheit: roundVal(celsiusToFarenheit(item.max_temp)),
        },
        airPressure: {
          mbar: roundVal(item.air_pressure),
          pa: roundVal(mbarToPa(item.air_pressure)),
        },
      };
      dict.dateString = dateString(dict.date);
      forecastData.sixDayWeather.push(dict);
    });
  }

  return {
    data: forecastData,
    status: !error && !data ? 'LOADING' : error ? 'ERROR' : 'OK',
    error: locationError | error,
  };
};

export default useForecast;
