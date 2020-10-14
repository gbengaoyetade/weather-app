import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  getDateFromTime,
  getIconURL,
  getLocalTime,
  useOfflineIndicator
} from '../helpers';
import { AppContext } from '../store';
import '../styles/cityDetails.scss';
import { CityDetails as CityDetailsType } from '../types';
import Notes from './Notes';
import FavoriteButton from './FavoriteButton';
import { countriesMap } from '../constants';

interface CityDetailsProps {
  cityDetails: CityDetailsType | undefined
}

const CityDetails = (props: CityDetailsProps) => {
  const { state } = useContext(AppContext);
  const { cityDetails } = props;

  useOfflineIndicator();

  if (state.isLoading) {
    return <img src="/loader.gif"  alt="loading indicator"/>
  }

  const getCityDetails = () => {
    if (!cityDetails) {
      return <p>City not found</p>;
    }

    const weatherDescription = cityDetails.weather[0].description;
    return (
      <div className="details-container">
        <div className="details-header">
          <p className="city-name">
            {cityDetails.name}, {countriesMap[cityDetails.sys.country]}
            <FavoriteButton cityDetails={cityDetails} />
          </p>
          <p>{getDateFromTime(cityDetails.sys.sunrise)}</p>
        </div>
        <div className="city-details-card">
          <div className="space-between">
            <div className="vertical-align">
              <p className="details-temp">{Math.floor(cityDetails.main.temp)}&#730;</p>
              <p>Feels like: {Math.floor(cityDetails.main.feels_like)}&#730;</p>
            </div>

            <div className="vertical-align">
              <img src={getIconURL(cityDetails.weather[0].icon)} alt={weatherDescription} />
              <p>{weatherDescription}</p>
            </div>
          </div>
          <div className="space-between">
            <p>Sunrise: {getLocalTime(cityDetails.sys.sunrise, cityDetails.timezone)} AM</p>
            <p>Sunset: {getLocalTime(cityDetails.sys.sunset, cityDetails.timezone)} PM</p>
          </div>
        </div>

        <ul className="details-list">
          <li><span>Max Temp:</span> <span className="bold">{cityDetails.main.temp_max}&#730;</span></li>
          <li><span>Min Temp:</span> <span className="bold">{cityDetails.main.temp_min}&#730;</span></li>
          <li><span>Humidity:</span> <span className="bold">{cityDetails.main.humidity}%</span></li>
          <li><span>Pressure:</span> <span className="bold">{cityDetails.main.pressure} hPa</span></li>
          <li><span>Wind Speed: </span> <span className="bold">{cityDetails.wind.speed} m/s</span></li>
          <li><span>Wind Deg:</span> <span className="bold">{cityDetails.wind.deg}&#730;</span></li>
        </ul>

        <Notes cityName={cityDetails?.name || ''} />
      </div>
    )
  }

  return (
    <div className="city-details-wrapper app">
      <Link to="/">Go back</Link>
      {getCityDetails()}
    </div>
  )
};


export default CityDetails;
