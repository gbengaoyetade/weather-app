import React, { useState } from 'react';
import { getCityFromAPI, getIconURL, saveCurrentSearchItem } from '../helpers';
import FavoriteButton from './FavoriteButton';
import { CityDetails } from '../types';
import '../styles/search.scss';
import { Link } from 'react-router-dom';


const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<CityDetails | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!searchInput) {
      return;
    }

    setFetchError('');
    setIsLoading(true);
    setSearchResult(null);

    const response = await getCityFromAPI({ q: searchInput });
    setIsLoading(false);
  
    if (response) {
      saveCurrentSearchItem(response)
      setSearchResult(response.data)
    } else {
      setFetchError('Your search returned no results.');
    }
   
  }
 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;

    if (!userInput) {
      setSearchResult(null);
      setFetchError('');
    }
  
    setSearchInput(userInput);
  }

  const renderSearchResult = () => {
    if (!searchInput || !searchResult) {
        return null;
    }
    
    if (searchResult) {
      const weatherDescription = searchResult.weather[0].description
      return (
        <div className="search-result">
          <p className="search-title">
            <Link to={`/${searchResult.name}/details`}>{searchResult.name} Weather</Link>
            <FavoriteButton cityDetails={searchResult} />
          </p>
          <div className="aligned-flex">
          <div className="search-result-details">
            <img src={getIconURL(searchResult.weather[0].icon)} alt={weatherDescription} />
            <p>{weatherDescription}</p>
          </div>
          <div className="search-result-details">
            <p className="main-temp">{Math.floor(searchResult.main.temp)}&#730;</p>
            <p>Feels like {Math.floor(searchResult.main.feels_like)}&#730;</p>
          </div>
        </div >
          <p className="aligned-flex">
            <span>High {Math.floor(searchResult.main.temp_max)}&#730;</span>
            |
            <span>Low {Math.floor(searchResult.main.temp_min)}&#730;</span>
            |
            <span>Humidity {searchResult.main.humidity}% </span>
          </p>
        </div>
      )
    }
  
  }
  return (
    <>
    <div className="search-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="cities-search"
          placeholder="Search cities"
          value={searchInput}
          onChange={handleChange}
          aria-label="Search city weather information"
        />
        <button data-testid="search-button">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
      
    </div>
    <div className="search-result-wrapper">
      { isLoading && <img src="/loader.gif"  alt="loading indicator"/>}
      { fetchError && <p className="error">{fetchError}</p>}
      {renderSearchResult()}
    </div>
    </>
  )
}

export default Search;
