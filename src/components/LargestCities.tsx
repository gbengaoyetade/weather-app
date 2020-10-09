import React from 'react';
import { WeatherInfo } from '../types';
import  CityListItem from './CityListItem';

interface LargestCitiesProps {
  cities: WeatherInfo[],
}

const LargestCities = (props: LargestCitiesProps) => {
  const { cities } = props;

  if (!cities.length){
    return (
      <p className="error">No weather information to display.</p>
    );
  }
  
  return <ul className="city-list">
    {cities.map((city: WeatherInfo) => {
      const { data } = city;
      return (
        <CityListItem
          city={data}
          key={data.name}
        />
      );
    })}
    </ul>
}

export default LargestCities;