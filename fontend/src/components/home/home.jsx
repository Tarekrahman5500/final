import React, {useEffect} from 'react';
import {HashLink} from 'react-router-hash-link';
import {CgMouse} from "react-icons/all";
import './Home.css'
import ProductCard from "./ProductCard.jsx";
import Metadata from "../layout/metaData"
import {getProduct} from "../../actions/productAction.js";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layout/loading/loader.jsx";
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch()
    const {loading, error, products, productCount} = useSelector(state => state.products)
    useEffect(() => {
        if (error) return  toast(error)
        dispatch(getProduct)
    }, [dispatch, error])
    return (
        <>
            {
                loading ? <Loader/>
                    : <>
                        <Metadata title="Home page"/>
                        <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <HashLink to="#container">
                                <button>
                                    Scroll <CgMouse/>
                                </button>
                            </HashLink>
                        </div>

                        <h2 className="homeHeading">Featured Products</h2>
                        <div className="container" id="container">

                            <div className="container" id="container">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product}/>
                                    ))}
                            </div>


                        </div>
                    </>
            }
        </>
    );
};

export default Home;