
import * as actions from './constants.js';

export const logIn = () => async (dispatch) => {
    dispatch({
        type: actions.LOG_IN,
    });
};

export const logOut = () => async (dispatch) => {
    dispatch({
        type: actions.LOG_OUT,
    });
};