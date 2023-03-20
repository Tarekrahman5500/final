import {applyMiddleware,combineReducers, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';
import thunk from "redux-thunk";
import {productDetailsReducer, productsReducer} from "./reducers/productReducers.js";
import {userReducer} from "./reducers/userReducer.js";

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer,
  user: userReducer,
})

let initialState = {}
const middleware = [thunk];
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store