import {
  REMOVE_WEATHER_INFO,
  ADD_WEATHER_INFO,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_LOADING,
  SAVE_NOTES,
  DELETE_NOTE
} from '../constants';

import {
  FavoritesMap,
  WeatherInfo,
  NotesType,
  WeatherInfoActionTypes,
  NotesActionType,
  LoadingActionType,
  FavoritesActionType
} from '../types';
import { saveFavorites, saveNotes } from '../helpers';


export const weatherInfoReducer = (state: WeatherInfo[], action: WeatherInfoActionTypes) => {
  switch(action.type) {
    case REMOVE_WEATHER_INFO:
      const filteredInfo = state.filter((info: WeatherInfo) => {
        return info.data.name !== action.cityName;
      });
      localStorage.setItem('largestCitiesInfo', JSON.stringify(filteredInfo))
      return filteredInfo;

    case ADD_WEATHER_INFO:
      return [ ...state, ...action.weatherInfo ];
    default:
      return state;
  }
}

export const favoritesReducer = (state: FavoritesMap, action: FavoritesActionType) => {
  switch(action.type) {
    case ADD_FAVORITE:
      const newState = { ...state, ...action.favoriteItem };
      saveFavorites(newState)
      return newState;

    case REMOVE_FAVORITE:
      const stateCopy = {...state};
      delete stateCopy[action.cityName || ''];
      saveFavorites(stateCopy);
      return stateCopy;

    default:
      return state
  }
}

export const loadingReducer = (state: Boolean, action: LoadingActionType) => {
  if(action.type === SET_LOADING) {
    return action.isLoading;
  }
  
  return state;
}

export const notesReducer = (state: NotesType, action: NotesActionType ) => {
  switch(action.type) {
    case SAVE_NOTES:
      const newState = { ...state, ...action.notes };
      saveNotes(newState)
      return newState;

    case DELETE_NOTE:
      const stateCopy = { ...state };
      delete stateCopy[action.cityName || ''];
      saveNotes(stateCopy);
      return stateCopy;
    default: 
      return state; 
  }
}