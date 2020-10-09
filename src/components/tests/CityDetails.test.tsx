import React from 'react';
import { render } from '@testing-library/react';
import CityDetails from '../CityDetails';
import { initialStateMock } from '../../mocks';
import { AppContext} from '../../store';

Date.now = jest.fn(() => 1487076708000) 

jest.mock('../Notes', () => jest.fn()
.mockImplementation(() => <>**Notes**</>))

jest.mock('react-router-dom', () => ({
  useParams: () => { return { cityName: 'Beijing' } },
  Link: () => <>**Link**</>
}))

describe('CityDetails', () => {

  const dispatch = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <AppContext.Provider value={{ state: initialStateMock, dispatch}}>
        <CityDetails />
      </AppContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when city cannot be found', () => {
    initialStateMock.favorites = {}
    const { container } = render(
      <AppContext.Provider value={{ state: initialStateMock, dispatch}}>
        <CityDetails />
      </AppContext.Provider>
    );
    expect(container).toMatchSnapshot();
  })
});