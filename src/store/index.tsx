import React, { createContext, useReducer, } from 'react';
import { FavoritesMap, WeatherInfo, NotesType } from '../types';
import {
  weatherInfoReducer,
  favoritesReducer,
  loadingReducer,
  notesReducer
} from './reducers';

interface InitialStateType {
	favorites: FavoritesMap
  weatherInfo: WeatherInfo[]
  isLoading: Boolean,
  notes: NotesType
}

const initialState  = {
	favorites: {},
  weatherInfo: [],
  isLoading: false,
  notes: {}
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
  favorites: favoritesReducer(state.favorites, action),
  isLoading: loadingReducer(state.isLoading, action),
  notes: notesReducer(state.notes, action)
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