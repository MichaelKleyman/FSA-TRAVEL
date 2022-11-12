import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import flightReducer from './flight';
import signUp from './signUp';
import admin from './admin';

const reducer = combineReducers({ auth, flightReducer, signUp, admin });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
