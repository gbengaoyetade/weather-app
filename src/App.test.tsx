import React from 'react';
import { render } from '@testing-library/react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

Object.defineProperty(window.navigator, 'geolocation',
{ value: { getCurrentPosition: jest.fn()}, writable: true });

describe('App', () => {
  beforeEach(() => {

  })
  it('should match snapshot', () => {
    const { container } = render(
      <Router>
        <Route>
          <App />
        </Route>
      </Router>
    );
    expect(container).toMatchSnapshot();
  })
})
