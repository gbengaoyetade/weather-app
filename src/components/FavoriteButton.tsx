import React, { useContext } from 'react';
import { AppContext } from '../store';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_WEATHER_INFO,
  REMOVE_WEATHER_INFO
} from '../constants';


interface FavoriteProps {
  cityName: string,
}

const FavoriteButton = (props: FavoriteProps) => {
  const { cityName } = props;
  const { state, dispatch } = useContext(AppContext);

  let iconName = 'fa-heart-o';
  let color = '#000';
  
  if (state.favorites[cityName]) {
    iconName = 'fa-heart';
    color = '#ec6e4d';
  }

  const hanldeClick = () => {
    
    if(state.favorites[cityName]){
      dispatch({ type: REMOVE_FAVORITE, cityName });
      dispatch({ type: ADD_WEATHER_INFO, weatherInfo: [state.favorites[cityName]] });
    } else {
      const cityDetails = state.weatherInfo.find((info) => info.data.name === cityName)
      const favoriteItem = { [cityName]: cityDetails };
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