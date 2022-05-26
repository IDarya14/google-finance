import { combineReducers } from 'redux';
import trickersReducer from '../reducers/trickersReducer';

export const rootReducer = combineReducers({
  trickersReducer,
});
