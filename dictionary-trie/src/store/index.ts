import { createStore, combineReducers, applyMiddleware } from 'redux';
import reporter from './middleware/reporter';
import dictionaryReducer from './reducer/dictionaryReducer';
import graphReducer from './reducer/graphReducer';

let reducers = combineReducers({
  dictionary: dictionaryReducer,
  graph: graphReducer
});

export default () => createStore(reducers, applyMiddleware(reporter));
