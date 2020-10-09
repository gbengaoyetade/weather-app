import {
  favoritesReducer,
  loadingReducer,
  notesReducer,
  weatherInfoReducer
} from './reducers';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_WEATHER_INFO,
  REMOVE_WEATHER_INFO,
  SAVE_NOTES,
  DELETE_NOTE,
  SET_LOADING
} from '../constants';
import { citiesMock } from '../mocks';


describe('Reducers', () => {

  describe('favoritesReducer', () => {
    it('should return the added item when action is of type ADD_FAVORITE', () => {
      const initialState = {};
      const action = {
        type: ADD_FAVORITE,
        favoriteItem: { Beijing: {data: citiesMock}}
      }
      const nextState = favoritesReducer(initialState, action);
      expect(nextState).toEqual({ Beijing: { data: citiesMock } })
    });

    it('should remove item when action is of type REMOVE_FAVORITE', () => {
      const initialState = { Beijing: {data: citiesMock}};
      const action = {
        type: REMOVE_FAVORITE,
        cityName: 'Beijing'
      }
      const nextState = favoritesReducer(initialState, action);
      expect(nextState).toEqual({});
    });
    it('should return state by default', () => {
      const initialState = {};
      const action = {
        type: 'some action'
      }
      const nextState = favoritesReducer(initialState, action);
      expect(nextState).toEqual({});
    });
  });

  describe('weatherInfoReducer', () => {
    it('should add item when action is of type ADD_WEATHER_INFO', () => {
      const initialState = [];
      const action = {
        type: ADD_WEATHER_INFO,
        weatherInfo: [{ data: citiesMock }]
      }
      const nextState = weatherInfoReducer(initialState, action);
      expect(nextState).toEqual(action.weatherInfo);
    })

    it('should remove item when action is of type REMOVE_WEATHER_INFO', () => {
      const initialState = [{ data: citiesMock }];
      const action = {
        type: REMOVE_WEATHER_INFO,
        cityName: 'Beijing' 
      }
      const nextState = weatherInfoReducer(initialState, action);
      expect(nextState).toEqual([]);
    });

    it('should return state by default', () => {
      const initialState = [{ data: citiesMock }];
      const action = {
        type: 'some type',
        cityName: 'Beijing' 
      }
      const nextState = weatherInfoReducer(initialState, action);
      expect(nextState).toEqual(initialState);
    });
  });

  describe('notesReducer', () => {
    it('should add notes when action is of type SAVE_NOTES', () => {
      const initialState = {};
      const action = {
        type: SAVE_NOTES,
        notes: { Beijing: 'hello world'}
      }
      const nextState = notesReducer(initialState, action);
      expect(nextState).toEqual(action.notes)
    });

    it('should remove notes when action is of type  DELETE_NOTE', () => {
      const initialState = { Beijing: 'hello world'};
      const action = {
        type: DELETE_NOTE,
        cityName: 'Beijing' 
      }
      const nextState = notesReducer(initialState, action);
      expect(nextState).toEqual({})
    });

    it('should return state by default', () => {
      const initialState = { Beijing: 'hello world'};
      const action = {
        type: 'hello',
        cityName: 'Beijing' 
      }
      const nextState = notesReducer(initialState, action);
      expect(nextState).toEqual(initialState)
    })
  });

  describe('loadingReducer', () => {
    it('should return state by default', () => {
      const initialState = false;
      const action = { type: 'something', payload: 'something' };
      const nextState = loadingReducer(initialState, action);
      expect(nextState).toEqual(initialState);
    });

    it('should set state when action is of type SET_LOADING', () => {
      const initialState = false;
      const action = { type: SET_LOADING, isLoading: true };
      const nextState = loadingReducer(initialState, action);
      expect(nextState).toEqual(action.isLoading);
    })
  });
});
