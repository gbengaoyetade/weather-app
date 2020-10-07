import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getLargestCitiesInfo, getCityFromAPI } from './helpers';
import { AppContext } from './store';
import { ADD_FAVORITE, ADD_WEATHER_INFO, REMOVE_WEATHER_INFO } from './constants';
import './App.scss';


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

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      if (!localStorage.getItem('hasSeenCurrentCity')) {
        const { coords } = data;
        const response = await getCityFromAPI({ lat: coords.latitude, lon: coords.longitude });
        localStorage.setItem('userCurrentCity', JSON.stringify(response?.data));
        localStorage.setItem('hasSeenCurrentCity', 'yes');
        history.push(`${response?.data.name}/details`);
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
    return <h1>Loading...</h1>
  }

  const handleRemove = (cityName: string) => {
    dispatch({
      type: REMOVE_WEATHER_INFO,
      cityName
    })
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
        onRemoveItem={handleRemove}
      />
    </div>
  );
}

export default App;
