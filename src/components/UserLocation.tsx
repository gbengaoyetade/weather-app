import React from 'react';
import CityDetails from './CityDetails';
import { getUserCurrentCity, usePopulateStore } from '../helpers';


const UserLocation = () => {
  usePopulateStore();

  const userCurrentCity = getUserCurrentCity();

  return <CityDetails cityDetails={userCurrentCity.data} />
};

export default UserLocation;
