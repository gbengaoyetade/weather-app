import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LargestCities from './components/LargestCities';
import Search from './components/Search';
import { getLargestCitiesInfo, getCityFromAPI } from './helpers';


function App() {
  const [fetching, setFetching] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState();
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

  

  const handleNetworkStatus = () => {

    if(!navigator.onLine){
      alert('You are offline')
    }
  }

  useEffect(() => {
    window.addEventListener('online', handleNetworkStatus);
    window.addEventListener('offline', handleNetworkStatus);

    return () => {
      window.removeEventListener('online', handleNetworkStatus);
      window.removeEventListener('offline', handleNetworkStatus);
    }
  }, []);

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

  return (
    <div className="App">
      <Search />
      <LargestCities cities={weatherInfo} onRemoveItem={handleRemove}/>
    </div>
  );
}

export default App;
