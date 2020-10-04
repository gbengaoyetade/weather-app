import axios from 'axios';
import { largestCities } from '../constants';

interface queryParams {
  q?: string,
  lat?: number,
  lon?: number,
}

const apiKey = process.env.REACT_APP_API_KEY;

const _citiesInfo = JSON.parse(localStorage.getItem('largestCitiesInfo') || '[]');

export const getLargestCitiesInfo = async () => {
  // if user already has weather information for the largest cities
  // we fetch the current weather info for these cities only
  if (_citiesInfo.length) {
    const citiesName = _getLargestCities(_citiesInfo);
    return await _fetchCurrentWeatherInfo(citiesName);
  } 
  
  // if user does not have any weather info in storage, 
  // we fetch the weather info for predetermined largest cities in the world
  const sortedCities = largestCities.sort((first, second) => {
    return first.localeCompare(second);
  })

  return await _fetchCurrentWeatherInfo(sortedCities);
}

export const getCityFromStorage = (cityName: string) => {
 return _citiesInfo.find((city: any) => city.data.name === cityName);
}

export const getCityFromAPI = async (query: queryParams) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { appid: apiKey, units: 'metric', ...query } })
    return response;
  } catch (error) {
    return null;
  }
}

export const getIconURL = (iconId: string): string => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}

const _getLargestCities = (cities: Array<any>) => {
  return cities.map((city) => city.data.name)
}

const _fetchCurrentWeatherInfo = async (cities: Array<string>) => {
  if (navigator.onLine) {
    const response = cities.map(async (city) => await getCityFromAPI({ q: city }) );
    const data = await Promise.all(response);
    localStorage.setItem('largestCitiesInfo', JSON.stringify(data));
    return data;
  }

  return _citiesInfo;
}

