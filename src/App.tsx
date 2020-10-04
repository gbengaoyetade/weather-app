import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getLargestCitiesInfo, getCityFromAPI } from './helpers';
import FavoriteButton from './components/FavoriteButton';
import './App.css';


const App = () => {
  const [fetching, setFetching] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState();
  const [favoritesMap, setFavoritesMap] = useState<any>({});
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

  const handleRemove = (cityInfo: any) => {
    const filteredInfo = weatherInfo.filter((info: any) => {
      return info.data.name !== cityInfo.name;
    });

    localStorage.setItem('largestCitiesInfo', JSON.stringify(filteredInfo))
    setWeatherInfo(filteredInfo)
  }

  const handleFavoriteClick = (cityDetails: any) => {
    let latestFavorites = { ...favoritesMap }
    if (favoritesMap[cityDetails.name]) {
      delete latestFavorites[cityDetails.name]
    } else {
      latestFavorites[cityDetails.name] = cityDetails;
    }
    const stringifiedFavorites = JSON.stringify(latestFavorites);
    localStorage.setItem('favoritesMap', stringifiedFavorites);
    setFavoritesMap(latestFavorites);
  }

  return (
    <div className="App">
      <Search />
      <div> Favorites: 
      {Object.entries(favoritesMap).sort((first,second) => {
        return first[0].localeCompare(second[0]);
      }).map((entry: any) => {
        return <p>
          {entry[1].name}
           <FavoriteButton
            city={entry[1]}
            onFavoriteClick={handleFavoriteClick}
            favoritesMap={favoritesMap}
          />
        </p>
      })}
      </div>
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
