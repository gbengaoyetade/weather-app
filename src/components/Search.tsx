import React, { useState } from 'react';
import { getCityFromAPI } from '../helpers';


const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await getCityFromAPI({ q: searchInput })
    
    if (response) {
      setSearchResult(response.data)
    }
   
  }

  const handleChange = (event: any) => {
    const userInput = event.target.value;

    if (!userInput) {
      setSearchResult(null)
    }
  
    setSearchInput(userInput);
  }

  const renderSearchResult = () => {
    if (!searchInput || !searchResult) {
        return null;
    }
  
    if (searchResult) {
      return (
        <div>
          <p>Temp: {Math.floor(searchResult.main.temp)} &#8451;</p>
          <p>Min Temp: {Math.floor(searchResult.main.temp_min)} &#8451;</p>
          <p>Max Temp: {Math.floor(searchResult.main.temp_max)} &#8451;</p>
        </div>
      )
    }
  
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cities-search">Search cities:</label>
        <input
          type="search"
          id="cities-search"
          name=""
          value={searchInput}
          onChange={handleChange}
          aria-label="Search city weather information"
        />

        <button>Search</button>
      </form>
      {renderSearchResult()}
    </div>
  )
}

export default Search;
