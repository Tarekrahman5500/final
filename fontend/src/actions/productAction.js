import axios from "../axios";
import {productConstants} from "../Constants/productConstant.js";

const {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL
}

    = productConstants


// Get All Products
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000],
                           category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({type: ALL_PRODUCT_REQUEST});

               let link = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}
               &price[lte]=${price[1]}&ratings[gte]=${ratings}`;

               if (category) {
                   link = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}
                   &price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
               }

            const {data} = await axios.get(link);
            //   console.log(data)

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        console.error(error.response.data.message);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};