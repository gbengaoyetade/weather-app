import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

Object.defineProperty(window.navigator, 'geolocation',
{ value: { getCurrentPosition: jest.fn()}, writable: true });

describe('App', () => {
  beforeEach(() => {

  })
  it('should match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  })
})
