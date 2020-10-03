import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CityDetails from './components/CityDetails';
import NotFound from './components/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:cityName/details">
          <CityDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

