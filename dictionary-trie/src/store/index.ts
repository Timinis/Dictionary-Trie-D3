import { createStore, combineReducers, applyMiddleware } from 'redux';
import reporter from './middleware/reporter';

import graphReducer from './reducer/graphReducer';

export default () => createStore(graphReducer, applyMiddleware(reporter));
