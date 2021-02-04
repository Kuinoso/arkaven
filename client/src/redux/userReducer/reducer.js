import * as actions from './constants.js';

const initialState = {
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    // case actions.GET_CHARACTER_INFO:
    //   return {
    //     ...state,
    //     characterId: action.payload
    //   };
    default:
      return state;
  };
};