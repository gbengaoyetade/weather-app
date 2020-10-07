import React from 'react';
import { useHistory } from 'react-router-dom';
import { CityDetails } from '../types';
import { countriesMap } from '../constants';
import { getIconURL } from '../helpers';
import FavoriteButton from './FavoriteButton';



interface CityListItemProps {
  city: CityDetails
  onRemoveItem: Function
}

const CityListItem = (props: CityListItemProps) => {
  const history = useHistory();
  const { city, onRemoveItem } = props;

  const handleCityClick = (city: string) => {
    history.push(`/${city}/details`);
  }

  return (
    <li key={city.name} >
      <div className="city-info" onClick={() => handleCityClick(city.name)}>
        <span>
          {city.name},
          <span className="bold-text">
            &nbsp;{countriesMap[city.sys.country]}
          </span>
        </span>
        <div className="aligned-flex">
          <span className="temperature">
            {Math.floor(city.main.temp)}&#8451;
              </span>
          <img src={getIconURL(city.weather[0].icon)} alt={city.weather[0].description} />
        </div>
      </div>
      <div className="">
        <button onClick={() => onRemoveItem(city.name)} className="app-button">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <FavoriteButton cityName={city.name} />
      </div>
    </li>
  );
};

export default CityListItem;