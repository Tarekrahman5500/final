import {applyMiddleware,combineReducers, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';
import thunk from "redux-thunk";
import {productDetailsReducer, productsReducer} from "./reducers/productReducers.js";

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer,
})

let initialState = {}
const middleware = [thunk];
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store