import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CityDetails } from '../types';
import { countriesMap } from '../constants';
import { getIconURL } from '../helpers';
import FavoriteButton from './FavoriteButton';
import { REMOVE_WEATHER_INFO, REMOVE_FAVORITE } from '../constants';
import { AppContext } from '../store';


interface CityListItemProps {
  city: CityDetails
}

const CityListItem = (props: CityListItemProps) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const { city } = props;
  
  const handleCityClick = (city: string) => {
    history.push(`/${city}/details`);
  }

  const handleRemove = (cityName: string) => {
    dispatch({ type: REMOVE_WEATHER_INFO, cityName })
    dispatch({ type: REMOVE_FAVORITE, cityName })
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
        <button
          onClick={() => handleRemove(city.name)}
          className="app-button"
          data-testid="delete-info"
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <FavoriteButton cityDetails={city} />
      </div>
    </li>
  );
};

export default CityListItem;