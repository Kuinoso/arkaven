import * as actions from './constants.js';

const initialState = {
  loggedIn: false,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOG_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actions.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  };
};