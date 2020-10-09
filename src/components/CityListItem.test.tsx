import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import CityListItem from './CityListItem';
import { AppContext } from '../store';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() }))
}));

describe('CityListItem', function() {
  afterEach(cleanup)

  afterAll(() => {
    jest.clearAllMocks();
  })

  const props = {
    city: {
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

  it('should match snapshot', () => {
    const { container } = render(<CityListItem {...props}/>);
    expect(container).toMatchSnapshot();
  });


  it('should handle user click on list item', () => {
    const { getByText } = render(<CityListItem {...props}/>);

    fireEvent.click(getByText('Beijing,'));
  });

  it('should call dispatch twice when delete button is clicked', () => {
    const dispatch = jest.fn();
    const initialState = {
      favorites: {},
      weatherInfo: [],
      notes: {},
      isLoading: false
    }
    const { getByTestId } = render(
      <AppContext.Provider value={{dispatch, state: initialState }}>
        <CityListItem {...props}/>
      </AppContext.Provider>
    );

    fireEvent.click(getByTestId('delete-info'));
    expect(dispatch).toHaveBeenCalledTimes(2)
  });
});
