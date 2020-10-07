import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CityDetails from './components/CityDetails';
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
            <CityDetails />
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

