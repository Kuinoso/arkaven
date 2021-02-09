import * as actions from './constants.js';

const initialState = {
  allGames: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    
      case actions.GET_ALL_GAMES:
        return {
          ...state,
          allGames: action.payload,
        };
    default:
      return state;
  };
};