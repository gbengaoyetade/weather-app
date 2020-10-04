import React from 'react';
import { getIconURL } from '../helpers';
import { countriesMap } from '../constants';
import FavoriteButton from './FavoriteButton';
import { Link } from 'react-router-dom';
import { WeatherInfo } from '../types';

interface LargestCitiesProps {
  cities: Array<any>,
  onRemoveItem: Function,
  favoritesMap: any,
  onFavoriteClick: Function
}

const LargestCities = (props: LargestCitiesProps) => {
  const { cities, onRemoveItem, onFavoriteClick, favoritesMap } = props;

  if (!cities) return null;
 
  return <ul className="city-list">
    {cities.map((city: WeatherInfo) => {
      const { data } = city;
      return (
        <li key={data.name} >
          <div className="city-info">
            <span>
              <Link to={`/${city}/details`}>
                {data.name}, {countriesMap[data.sys.country]}
              </Link>
            </span>
            <div className="aligned-flex">
              <span className="temperature">
                {Math.floor(data.main.temp)}&#8451;
              </span>
              <img src={getIconURL(data.weather[0].icon)} alt={data.weather[0].description} />
            </div>
          </div>
          <div className="">
            <button onClick={() => onRemoveItem(data)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            <FavoriteButton
              city={data}
              onFavoriteClick={onFavoriteClick}
              favoritesMap={favoritesMap}
            />
          </div>
          
        </li>
      );
    })}
    </ul>
}

export default LargestCities;