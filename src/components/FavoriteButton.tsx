import React, { useContext } from 'react';
import { AppContext } from '../store';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_WEATHER_INFO,
  REMOVE_WEATHER_INFO,
  largestCities
} from '../constants';
import { CityDetails } from '../types';


interface FavoriteProps {
  cityDetails: CityDetails 
}

const FavoriteButton = (props: FavoriteProps) => {
  const { cityDetails } = props;
  const { state, dispatch } = useContext(AppContext);

  let iconName = 'fa-heart-o';
  let color = '#000';
  
  if (state.favorites[cityDetails.name]) {
    iconName = 'fa-heart';
    color = '#ec6e4d';
  }

  const hanldeClick = () => {
    const cityName = cityDetails.name;
    const isOneOfLargestCities = largestCities.find((name) => name === cityName);
  
    if(state.favorites[cityName]) {
      dispatch({ type: REMOVE_FAVORITE, cityName });
      isOneOfLargestCities ?
        dispatch({ type: ADD_WEATHER_INFO, weatherInfo: [{ data: cityDetails }] }) :
        dispatch({ type: REMOVE_WEATHER_INFO, cityName });
    } else {
      const favoriteItem = { [cityName]: { data: cityDetails } };
      dispatch({ type: ADD_FAVORITE, favoriteItem });
      dispatch({ type: REMOVE_WEATHER_INFO, cityName });
    }
  }
  
  return (
    <button
      className="app-button"
      onClick={hanldeClick}
      style={{color}}
    >
      <i className={`fa ${iconName}`} aria-hidden="true"></i>
    </button>
  )

};


export default FavoriteButton