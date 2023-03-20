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
export const userReducer = (state = {user: {}}, action) => {
    if (action.type === LOGIN_REQUEST || action.type === REGISTER_USER_REQUEST || action.type === LOAD_USER_REQUEST) {
        return {
            loading: true,
            isAuthenticated: false,
        };
    } else if (action.type === LOGIN_SUCCESS || action.type === REGISTER_USER_SUCCESS || action.type === LOAD_USER_SUCCESS) {
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        };
    } else if (action.type === LOGOUT_SUCCESS) {
        return {
            loading: false,
            user: null,
            isAuthenticated: false,
        };
    } else if (action.type === LOGIN_FAIL || action.type === REGISTER_USER_FAIL) {
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        };
    } else if (action.type === LOAD_USER_FAIL) {
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        };
    } else if (action.type === LOGOUT_FAIL) {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    } else if (action.type === CLEAR_ERRORS) {
        return {
            ...state,
            error: null,
        };
    } else {
        return state;
    }
};