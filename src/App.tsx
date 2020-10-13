import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import {
  getCityFromAPI,
  usePopulateStore,
  useOfflineIndicator,
  getUserCurrentCity
} from './helpers';
import { AppContext } from './store';
import { ADD_FAVORITE } from './constants';
import './styles/app.scss';

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  usePopulateStore();
  useOfflineIndicator();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      if (!localStorage.getItem('hasSeenCurrentCity')) {
        const { coords } = data;
        const response = await getCityFromAPI({ lat: coords.latitude, lon: coords.longitude });
        
        if (response) {
          localStorage.setItem('userCurrentCity', JSON.stringify(response));
          localStorage.setItem('hasSeenCurrentCity', 'yes');
          history.push('user/location');
        }
      }
    });
  }, [history]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    dispatch({ type: ADD_FAVORITE, favoriteItem: favorites })
  }, [dispatch])

  if (state.isLoading) {
    return <img src="/loader.gif"  alt="loading indicator"/>
  }

  const favoritesArray = Object.entries(state.favorites).sort((first, second) => {
    return first[1].data.name.localeCompare(second[1].data.name)
  }).map((entry) => entry[1]);

  const sortedWeatherInfo = state.weatherInfo.sort((first, second) => {
    return first.data.name.localeCompare(second.data.name);
  })

  const largestCitiesInfo = [...favoritesArray, ...sortedWeatherInfo];

  const userCurrentCity = getUserCurrentCity();

  return (
    <div className="app">
      {
        userCurrentCity &&
        <p className="no-margin"><Link to="/user/location">My location</Link></p>
      }
     
    
      <Search />
      <p><i className="fas fa-long-arrow-alt-left"></i></p>
      <LargestCities
        cities={largestCitiesInfo}
      />
    </div>
  );
}

export default App;
