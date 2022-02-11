import { isAsyncThunkAction } from '@reduxjs/toolkit';
import{createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';

const rootReducer = combineReducers({userReducer});
export const Store = createStore(rootReducer, applyMiddleware(isAsyncThunkAction));