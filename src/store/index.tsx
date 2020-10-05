import { createContext, useReducer } from 'react';
import reducer from '../store/reducer';


export const AppContext = createContext({});


const [state, dispatch] = useReducer(reducer, {hello: 'hi'}) 


export const store = { state, dispatch };
