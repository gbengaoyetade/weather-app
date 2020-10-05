import React from 'react';
import { FavoritesMap, WeatherInfo } from '../types';
import  CityListItem from './CityListItem';

interface LargestCitiesProps {
  cities: WeatherInfo[],
  onRemoveItem: Function,
  favoritesMap: FavoritesMap,
  onFavoriteClick: Function
}

const LargestCities = (props: LargestCitiesProps) => {
  const { cities, onRemoveItem, onFavoriteClick, favoritesMap } = props;
  

  if (!cities) return null;
  
  return <ul className="city-list">
    {cities.map((city: WeatherInfo) => {
      const { data } = city;
      return (
        <CityListItem
          onRemoveItem={onRemoveItem}
          onFavoriteClick={onFavoriteClick}
          favoritesMap={favoritesMap}
          city={data}
        />
      );
    })}
    </ul>
}

export default LargestCities;