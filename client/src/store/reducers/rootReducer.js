import { combineReducers } from 'redux';
import { tickersReducer } from '../reducers/trickersReducer';

export const rootReducer = combineReducers({
  tickersReducer,
});
