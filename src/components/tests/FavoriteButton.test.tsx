import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoriteButton from '../FavoriteButton';
import { AppContext } from '../../store';
import { citiesMock, initialStateMock as state } from '../../mocks';


describe('FavoriteButton', () => {
  const props = { cityDetails: citiesMock };

  const dispatch = jest.fn();

  afterEach(cleanup);

  it('should match snapshot', () => {
    const { container } = render(<FavoriteButton {...props}/>);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when cityName is a favorite', () => {

    const { container } = render(
      <AppContext.Provider value={{dispatch, state }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should call dispatch when favorite button is clicked', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={{dispatch, state }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByTestId('favorite-button'));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should call dispatch when city is not in favorite list and button is clicked', () => {
    props.cityDetails.name = 'Lagos';
    const { getByTestId } = render(
      <AppContext.Provider value={{dispatch, state }}>
        <FavoriteButton {...props}/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByTestId('favorite-button'));
    expect(dispatch).toHaveBeenCalled();
  });
});