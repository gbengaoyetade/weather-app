import axios from 'axios';
import { largestCities } from '../constants';
import { FavoritesMap, NotesType, WeatherInfo } from '../types';
export { default as usePopulateStore } from './populateStore';

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

  return await _fetchCurrentWeatherInfo(largestCities);
}

export const getCityFromStorage = (cityName: string) :WeatherInfo => {
 return _citiesInfo.find((city: WeatherInfo) => city.data.name === cityName);
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

export const saveFavorites = (favorites: FavoritesMap) => {
  const stringifiedFavorites = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringifiedFavorites);
}

export const getDateFromTime = (time: number): string => {
  const date = new Date(time * 1000);
  return date.toDateString();
}

export const getLocalTime = (time: number, timeZone: number): string => {
  const date = new Date((time + timeZone) * 1000);
  return date.toLocaleTimeString();
}

export const getFavorites = () => {
  const favorites =  JSON.parse(localStorage.getItem('favorites') || '{}');
  return favorites;
}

export const saveNotes  = (notes: NotesType) => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

export const getLargestCitesWeather = () => {
  return JSON.parse(localStorage.getItem('largestCitiesInfo') || '[]');
}

export const getNotes = () => {
  return JSON.parse(localStorage.getItem('notes') || '{}');
}

export const getUserCurrentCity = () => {
  return JSON.parse(localStorage.getItem('userCurrentCity') || '{}');
}

export const getCurrentSearchItem = () => {
  return JSON.parse(localStorage.getItem('currentSearchItem') || '{}');
}

export const saveCurrentSearchItem = (response: WeatherInfo) => {
  localStorage.setItem('currentSearchItem', JSON.stringify(response))
}

const _getLargestCities = (cities: WeatherInfo[]) => {
  return cities.map((city) => city.data.name)
}

const _fetchCurrentWeatherInfo = async (cities: Array<string>) => {
  if (navigator.onLine) {
    const response = cities.map(async (city) => await getCityFromAPI({ q: city }) );
    const data = await Promise.all(response);

    const someDataIsNull = data.some((value) => !value);
  
    if(someDataIsNull) {
      return null;
    }

    localStorage.setItem('largestCitiesInfo', JSON.stringify(data));
    return data;
  }

  return _citiesInfo;
}

