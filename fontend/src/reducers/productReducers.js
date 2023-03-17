import {productConstants} from "../Constants/productConstant.js";

const {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CLEAR_ERRORS,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL
}

    = productConstants

export const productsReducer = (state = {products: []}, action) => {
    if (action.type === ALL_PRODUCT_REQUEST || action.type === ADMIN_PRODUCT_REQUEST) {
        return {
            loading: true,
            products: [],
        };
    } else if (action.type === ALL_PRODUCT_SUCCESS) {
        return {
            loading: false,
            products: action.payload.products,
            productsCount: action.payload.productsCount,
            resultPerPage: action.payload.resultPerPage,
            filteredProductsCount: action.payload.filteredProductsCount,
        };
    } else if (action.type === ADMIN_PRODUCT_SUCCESS) {
        return {
            loading: false,
            products: action.payload,
        };
    } else if (action.type === ALL_PRODUCT_FAIL || action.type === ADMIN_PRODUCT_FAIL) {
        return {
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    if (action.type === PRODUCT_DETAILS_REQUEST) {
        return {
            loading: true,
            ...state,
        };
    } else if (action.type === PRODUCT_DETAILS_SUCCESS) {
        return {
            loading: false,
            product: action.payload,
        };
    } else if (action.type === PRODUCT_DETAILS_FAIL) {
        return {
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

