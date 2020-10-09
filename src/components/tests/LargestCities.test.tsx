import React from 'react';
import { render } from '@testing-library/react';
import LargestCities from '../LargestCities';
import { citiesMock } from '../../mocks';


jest.mock('../CityListItem', () => jest.fn()
.mockImplementation(() => <>**CityListItem**</>))
describe('LargestCities', () => {
  const props = { cities: [{ data: citiesMock }] };

  it('should match snapshot when cities are empty', () => {
    const { container } = render(<LargestCities cities={[]}/>);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when cities are present', () => {
    const { container } = render(<LargestCities {...props}/>);
    expect(container).toMatchSnapshot();
  });
});
