
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

export const getAllUsers = (data) => async (dispatch) => {
    dispatch({
        type: actions.GET_ALL_USERS,
        payload: data,
    });
};

export const getLoggedUser = (data) => async (dispatch) => {
    dispatch({
        type: actions.GET_LOGGED_USER,
        payload: data,
    });
};