import React from 'react';
import { WeatherInfo } from '../types';
import  CityListItem from './CityListItem';

interface LargestCitiesProps {
  cities: WeatherInfo[],
  onRemoveItem: Function,
}

const LargestCities = (props: LargestCitiesProps) => {
  const { cities, onRemoveItem } = props;
  

  if (!cities) return null;
  
  return <ul className="city-list">
    {cities.map((city: WeatherInfo) => {
      const { data } = city;
      return (
        <CityListItem
          onRemoveItem={onRemoveItem}
          city={data}
          key={data.name}
        />
      );
    })}
    </ul>
}

export default LargestCities;