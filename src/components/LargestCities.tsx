import React from 'react';
import { Link } from 'react-router-dom';
import { getIconURL } from '../helpers';
import FavoriteButton from './FavoriteButton';

interface LargestCitiesProps {
  cities: Array<any>,
  onRemoveItem: Function,
  favoritesMap: any,
  onFavoriteClick: Function
}

const LargestCities = (props: LargestCitiesProps) => {
  const { cities, onRemoveItem, onFavoriteClick, favoritesMap} = props;

  if (!cities) return null;

  return <ol>
    {cities.map((city: any) => {
      const { data } = city;
      return (
        <li key={data.name}>
          <Link to={`/${data.name}/details`}> {data.name}</Link>{Math.floor(data.main.temp)}&#8451;
          <img src={getIconURL(data.weather[0].icon)} alt={data.weather[0].description} />
          <button onClick={() => onRemoveItem(data)}>-</button>
          <FavoriteButton
            city={data}
            onFavoriteClick={onFavoriteClick}
            favoritesMap={favoritesMap}
          />
        </li>
      );
    })}
    </ol>
}

export default LargestCities;