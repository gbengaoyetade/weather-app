import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import CityListItem from '../CityListItem';
import { AppContext } from '../../store';
import { citiesMock } from '../../mocks';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() }))
}));

describe('CityListItem', function() {
  afterEach(cleanup)

  afterAll(() => {
    jest.clearAllMocks();
  })

  const props = { city: citiesMock };

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
