import React, { useContext } from 'react';
import { useParams, } from 'react-router-dom';
import CityDetails from './CityDetails';
import { getCurrentSearchItem, usePopulateStore } from '../helpers';
import { AppContext } from '../store';
import { WeatherInfo } from '../types';


const CityDetailsPage = () => {
  const { state } = useContext(AppContext);
  const { cityName } = useParams<{ cityName:string }>();
  const currentSearchItem = getCurrentSearchItem();

   usePopulateStore();
  
  let cityDetails : WeatherInfo | undefined = state.favorites[cityName];

  if (state.isLoading) {
    return <img src="/loader.gif"  alt="loading indicator"/>
  }


  if (!cityDetails && currentSearchItem?.data?.name === cityName) {
    cityDetails = currentSearchItem;
  }

  if (!cityDetails) {
    cityDetails = state.weatherInfo.find((info) => {
      return info.data.name === cityName;
    })
  }

  return <CityDetails cityDetails={cityDetails?.data}/>;
}

export default CityDetailsPage;
