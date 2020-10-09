import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import { AppContext } from '../store';


describe('FavoriteButton', () => {
  const props = {
    cityDetails: {
      base: "stations",
      clouds: {all: 0},
      cod: 200,
      coord: {lon: 116.4, lat: 39.91},
      dt: 1602226045,
      id: 1816670,
      main: {temp: 23.52, feels_like: 22.22, temp_min: 23.33, temp_max: 23.89, pressure: 1014, humidity: 47},
      name: "Beijing",
      sys: {type: 3, id: 2000022, country: 'CN', sunrise: 1602195502, sunset: 1602236679},
      timezone: 28800,
      visibility: 10000,
      weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01d"}],
      wind: {speed: 2.55, deg: 209},
    }
  }

  const initialState = {
    favorites: { 'Beijing': {} },
    weatherInfo: [],
    notes: {},
    isLoading: false
  }

  const dispatch = jest.fn();

  afterEach(cleanup);

  it('should match snapshot', () => {
    const { container } = render(<FavoriteButton {...props}/>);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when cityName is a favorite', () => {

    const { container } = render(
      <AppContext.Provider value={{dispatch, state: initialState }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should call dispatch when favorite button is clicked', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={{dispatch, state: initialState }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByTestId('favorite-button'));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should call dispatch when city is not in favorite list and button is clicked', () => {
    props.cityDetails.name = 'Lagos';
    const { getByTestId } = render(
      <AppContext.Provider value={{dispatch, state: initialState }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByTestId('favorite-button'));
    expect(dispatch).toHaveBeenCalled();
  });
});