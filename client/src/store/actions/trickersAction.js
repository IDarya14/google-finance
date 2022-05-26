import { SET_ALL_TRICKERS } from '../types';

const setAllTrickers = (triker) => ({
  type: SET_ALL_TRICKERS,
  payload: triker,
});

export default setAllTrickers;
