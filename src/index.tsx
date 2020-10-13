import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CityDetailsPage from './components/CityDetailsPage';
import UserLocation from './components/UserLocation';
import NotFound from './components/NotFound';
import { AppProvider } from './store'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/:cityName/details">
            <CityDetailsPage />
          </Route>
          <Route path="/user/location">
            <UserLocation />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

