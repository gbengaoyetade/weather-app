import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getCityFromAPI, usePopulateStore } from './helpers';
import { AppContext } from './store';
import { ADD_FAVORITE } from './constants';
import './styles/app.scss';

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  usePopulateStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      if (!localStorage.getItem('hasSeenCurrentCity')) {
        const { coords } = data;
        const response = await getCityFromAPI({ lat: coords.latitude, lon: coords.longitude });
        
        if (response) {
          localStorage.setItem('userCurrentCity', JSON.stringify(response));
          localStorage.setItem('hasSeenCurrentCity', 'yes');
          history.push(`${response?.data.name}/details`);
        }
      }
    });
  }, [history]);

  useEffect(() => {
    window.addEventListener('online', handleNetworkStatus);
    window.addEventListener('offline', handleNetworkStatus);

    return () => {
      window.removeEventListener('online', handleNetworkStatus);
      window.removeEventListener('offline', handleNetworkStatus);
    }
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    dispatch({ type: ADD_FAVORITE, favoriteItem: favorites })
  }, [dispatch])

  const handleNetworkStatus = () => {
    if(!navigator.onLine){
      alert('You are offline')
    }
  }

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

  return (
    <div className="app">
      <Search />
      <LargestCities
        cities={largestCitiesInfo}
      />
    </div>
  );
}

export default App;
