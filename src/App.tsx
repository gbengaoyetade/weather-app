import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getLargestCitiesInfo, getCityFromAPI } from './helpers';
import { WeatherInfo, FavoritesMap, CityDetails } from './types';
import './App.scss';


const App = () => {
  const [fetching, setFetching] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo[]>([]);
  const [favoritesMap, setFavoritesMap] = useState<FavoritesMap>({});
  const history = useHistory();

  useEffect(() => {

    const fetchData = async () => {

      setFetching(true)
      await getLargestCitiesInfo();
      setFetching(false)
      const citiesInfo = JSON.parse(localStorage.getItem('largestCitiesInfo') || '[]')
      setWeatherInfo(citiesInfo)
    }

    fetchData();
  }, []);

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
    const favorites = JSON.parse(localStorage.getItem('favoritesMap') || '{}');
    setFavoritesMap(favorites);
  }, [])

  const handleNetworkStatus = () => {
      if(!navigator.onLine){
        alert('You are offline')
      }
    }


  if (fetching) {
    return <h1>Loading...</h1>
  }

  const handleRemove = (cityInfo: CityDetails) => {
    if (weatherInfo) {
      const filteredInfo = weatherInfo.filter((info) => {
        return info.data.name !== cityInfo.name;
      });

      localStorage.setItem('largestCitiesInfo', JSON.stringify(filteredInfo))
      setWeatherInfo(filteredInfo);
    }
    
  }

  const generateCitiesList = () => {
   const favoritesArray = Object.entries(favoritesMap).sort((first, second) => {
      return first[1].data.name.localeCompare(second[1].data.name)
    }).map((item) => item[1]);
    setWeatherInfo([...favoritesArray, ...weatherInfo])
  }
  
  const handleFavoriteClick = (cityDetails: WeatherInfo) => {
    let latestFavorites = { ...favoritesMap }
    if (favoritesMap[cityDetails.data.name]) {
      delete latestFavorites[cityDetails.data.name]
    } else {
      latestFavorites[cityDetails.data.name] = cityDetails;
    }
    handleRemove(cityDetails.data)
    const stringifiedFavorites = JSON.stringify(latestFavorites);
    localStorage.setItem('favoritesMap', stringifiedFavorites);
    setFavoritesMap(latestFavorites);
    generateCitiesList();
  }

  return (
    <div className="app">
      <Search />
      <LargestCities
        cities={weatherInfo || []}
        onRemoveItem={handleRemove}
        onFavoriteClick={handleFavoriteClick}
        favoritesMap={favoritesMap}
        />
    </div>
  );
}

export default App;
