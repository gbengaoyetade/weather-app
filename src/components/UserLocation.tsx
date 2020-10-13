import React from 'react';
import CityDetails from './CityDetails';
import { getUserCurrentCity } from '../helpers';


const UserLocation = () => {
  const userCurrentCity = getUserCurrentCity();

  return <CityDetails cityDetails={userCurrentCity.data} />
};

export default UserLocation;
