import axios from "../axios";
import {userConstants} from "../Constants/userConstants";
import header from "../components/layout/header/header.jsx";


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
    axios.defaults.withCredentials = true;
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            `login`,
            {email, password},
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(`register`, userData, config);

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = (token) => async (dispatch) => {
    //   axios.defaults.withCredentials = true;
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios(`me`, {
            headers: {
                Authorization: token
            }
        })

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};

