import { SET_ALL_TRICKERS } from '../types';

const initialState = {
  trickers: [],
};

const tickersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TRICKERS:
      return {
        ...state,
        trickers: action.payload,
      };
    default:
      return state;
  }
};

export default tickersReducer;
