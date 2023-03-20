import React, {useEffect, useState} from 'react';
import ProductCard from ".././home/ProductCard.jsx";
import {clearErrors, getProduct} from "../../actions/productAction.js";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layout/loading/loader.jsx";
import {toast} from "react-toastify";
import MetaData from "../layout/metaData";
import './product.css'
import {useParams} from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography";
import {Slider} from "@mui/material";

const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones",];
const Products = () => {
    const dispatch = useDispatch()
    const {keyword} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    //  console.log(keyword)
    const {
        loading, error, products, productsCount, resultPerPage, filteredProductsCount,
    } = useSelector(state => state.products)
    //  console.log(productsCount)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, error, keyword, currentPage, price, category, ratings])


    let count = filteredProductsCount;
    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <MetaData title="Products"/>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};


export default Products;