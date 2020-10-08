import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getDateFromTime,
  getIconURL,
  getLocalTime
} from '../helpers';
import { AppContext } from '../store';
import '../styles/cityDetails.scss';
import { WeatherInfo } from '../types';

const CityDetails = () => {
  const { state } = useContext(AppContext);
  const [notesEditable, setNotesEditable] = useState(false);

  const { cityName } = useParams<{ cityName:string }>();
  const storedNotes = localStorage.getItem(cityName) || '';
  const userCurrentCity = JSON.parse(localStorage.getItem('userCurrentCity') || '{}');
  const [notes, setNotes] = useState(storedNotes);
  
  let cityDetails : WeatherInfo | undefined = state.favorites[cityName];

  if (userCurrentCity?.name === cityName) {
    cityDetails = userCurrentCity;
  }

  if(!cityDetails) {
    cityDetails = state.weatherInfo.find((info) => {
      return info.data.name === cityName;
    })
  }

  const handleSave = (event: any) => {
    event.preventDefault();
    localStorage.setItem(cityName, notes)
    setNotesEditable(false);
  }

  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const handleCancelClick = () => {
    setNotesEditable(false)
    setNotes('')
  }

  const getCityDetails = () => {
    if (!cityDetails) {
      return <p>City not found</p>;
    }
    console.log(cityDetails)
    const { data } = cityDetails;
    const weatherDescription = data.weather[0].description;
    return (
      <div>
        <div className="details-header">
          <p>
            <i className="fas fa-map-marker-alt"></i>
            {cityDetails.data.name}
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

        <ul>
          <li><span>Max Temp:</span> <span>{data.main.temp_max}&#730;</span></li>
          <li><span>Min Temp:</span> <span>{data.main.temp_min}&#730;</span></li>
          <li><span>Humidity:</span> <span>{data.main.humidity}%</span></li>
          <li><span>Pressure:</span> <span>{data.main.pressure} hPa</span></li>
          <li><span>Wind</span> Speed: <span>{data.wind.speed} m/s</span></li>
          <li><span>Wind Deg:</span> <span>{data.wind.deg}&#730;</span></li>
        </ul>
      </div>
    )
  }

  const getCommentSection = () => {
    if (!cityDetails){
      return null;
    }

    if (notesEditable) {
      return (
        <>
          <form>
            <textarea value={notes} onChange={handleCommentChange}></textarea>
          </form>
           <button onClick={handleSave}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      )
    }

    return (
      <>
        <p>{storedNotes}</p>
        <button onClick={() => setNotesEditable(true)} >Edit</button>
      </>
    )
  }

  return (
    <div className="city-details-wrapper app">
      <Link to="/"> Go Back</Link>
      {getCityDetails()}
      {getCommentSection()}
    </div>
  )
};


export default CityDetails;
