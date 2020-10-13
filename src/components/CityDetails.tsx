import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getDateFromTime,
  getIconURL,
  getLocalTime,
  usePopulateStore,
  getUserCurrentCity,
  getCurrentSearchItem,
  useOfflineIndicator
} from '../helpers';
import { AppContext } from '../store';
import '../styles/cityDetails.scss';
import { WeatherInfo } from '../types';
import Notes from './Notes';
import FavoriteButton from './FavoriteButton';
import { countriesMap } from '../constants';

const CityDetails = () => {
  const { state } = useContext(AppContext);

  usePopulateStore();
  useOfflineIndicator();

  const { cityName } = useParams<{ cityName:string }>();
  const userCurrentCity = getUserCurrentCity();
  const currentSearchItem = getCurrentSearchItem();
  
  let cityDetails : WeatherInfo | undefined = state.favorites[cityName];

  if (state.isLoading) {
    return <img src="/loader.gif"  alt="loading indicator"/>
  }

  if (userCurrentCity?.data?.name === cityName) {
    cityDetails = userCurrentCity;
  }

  if (!cityDetails && currentSearchItem?.data?.name === cityName) {
    cityDetails = currentSearchItem;
  }

  if (!cityDetails) {
    cityDetails = state.weatherInfo.find((info) => {
      return info.data.name === cityName;
    })
  }

  const getCityDetails = () => {
    if (!cityDetails) {
      return <p>City not found</p>;
    }

    const { data } = cityDetails;
    const weatherDescription = data.weather[0].description;
    return (
      <div className="details-container">
        <div className="details-header">
          <p className="city-name">
            {cityDetails.data.name}, {countriesMap[data.sys.country]}
            <FavoriteButton cityDetails={data} />
          </p>
          <p>{getDateFromTime(data.sys.sunrise)}</p>
        </div>
        <div className="city-details-card">
          <div className="space-between">
            <div className="vertical-align">
              <p className="details-temp">{Math.floor(data.main.temp)}&#730;</p>
              <p>Feels like: {Math.floor(data.main.feels_like)}&#730;</p>
            </div>

            <div className="vertical-align">
              <img src={getIconURL(data.weather[0].icon)} alt={weatherDescription} />
              <p>{weatherDescription}</p>
            </div>
          </div>
          <div className="space-between">
            <p>Sunrise: {getLocalTime(data.sys.sunrise, data.timezone)} AM</p>
            <p>Sunset: {getLocalTime(data.sys.sunset, data.timezone)} PM</p>
          </div>
        </div>

        <ul className="details-list">
          <li><span>Max Temp:</span> <span className="bold">{data.main.temp_max}&#730;</span></li>
          <li><span>Min Temp:</span> <span className="bold">{data.main.temp_min}&#730;</span></li>
          <li><span>Humidity:</span> <span className="bold">{data.main.humidity}%</span></li>
          <li><span>Pressure:</span> <span className="bold">{data.main.pressure} hPa</span></li>
          <li><span>Wind Speed: </span> <span className="bold">{data.wind.speed} m/s</span></li>
          <li><span>Wind Deg:</span> <span className="bold">{data.wind.deg}&#730;</span></li>
        </ul>
      </div>
    )
  }

  return (
    <div className="city-details-wrapper app">
      <Link to="/">Go back</Link>
      {getCityDetails()}
      <Notes cityName={cityName} />
    </div>
  )
};


export default CityDetails;
