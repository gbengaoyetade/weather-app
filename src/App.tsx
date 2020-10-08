import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getLargestCitiesInfo, getCityFromAPI } from './helpers';
import { AppContext } from './store';
import { ADD_FAVORITE, ADD_WEATHER_INFO } from './constants';
import './styles/app.scss';

const App = () => {
  const [fetching, setFetching] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      await getLargestCitiesInfo();
      setFetching(false)
      const citiesInfo = JSON.parse(localStorage.getItem('largestCitiesInfo') || '[]');
      dispatch({
        type: ADD_WEATHER_INFO,
        weatherInfo: citiesInfo
      })
    }
    if(!state.weatherInfo.length) {
      fetchData(); 
    }
  }, [dispatch, state.weatherInfo.length]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      if (!localStorage.getItem('hasSeenCurrentCity')) {
        const { coords } = data;
        const response = await getCityFromAPI({ lat: coords.latitude, lon: coords.longitude });
        
        if (response) {
          localStorage.setItem('userCurrentCity', JSON.stringify(response?.data));
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

  if (fetching) {
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
