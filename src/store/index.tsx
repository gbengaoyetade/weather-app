import React, { createContext, useReducer } from 'react';
import { FavoritesMap, WeatherInfo } from '../types';
import { weatherInfoReducer, favoritesReducer } from './reducers';

interface InitialStateType {
	favorites: FavoritesMap
	weatherInfo: WeatherInfo[]
}

const initialState  = {
	favorites: {},
	weatherInfo: []
}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });

const mainReducer = (state: InitialStateType, action: any) => ({
  weatherInfo: weatherInfoReducer(state.weatherInfo, action),
  favorites: favoritesReducer(state.favorites, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
      <AppContext.Provider value={{state, dispatch}}>
      {children}
      </AppContext.Provider>
  )
}
  
  export { AppContext, AppProvider };