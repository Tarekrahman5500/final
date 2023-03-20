import axios from "../axios";
import {userConstants} from "../Constants/userConstants";


const {
    LOGIN_REQUEST,
    REGISTER_USER_REQUEST,
    LOAD_USER_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_SUCCESS,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_FAIL,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} = userConstants

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            `login`,
            {email, password},
            config
        );

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};

