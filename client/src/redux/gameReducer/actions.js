
import * as actions from './constants.js';

export const getAllGames = (data) => async (dispatch) => {
    dispatch({
        type: actions.GET_ALL_GAMES,
        payload: data,
    });
};