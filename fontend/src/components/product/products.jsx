import React, {useEffect, useState} from 'react';
import ProductCard from ".././home/ProductCard.jsx";
import {getProduct} from "../../actions/productAction.js";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layout/loading/loader.jsx";
import {toast} from "react-toastify";
import MetaData from "../layout/metaData";
import './product.css'
import {useParams} from "react-router-dom";
import Pagination from "react-js-pagination";
//import {Stack} from "@mui/material";
//import {Pagination, Stack} from "@mui/material";

const Products = () => {
    const dispatch = useDispatch()
    const {keyword} = useParams();
    const [currentPage, setCurrentPage] = useState(1);


    //  console.log(keyword)
    const {loading, error, products, productsCount, resultPerPage} = useSelector(state => state.products)
    //  console.log(productsCount)
    useEffect(() => {
        if (error) return toast.error(error)
        dispatch(getProduct(keyword, currentPage))
    }, [dispatch, error, keyword, currentPage])

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    return (
        <>
            {
                loading ? <Loader/>
                    : (
                        <>
                            <MetaData title="Products Page"/>
                            <h2 className="productsHeading">Products</h2>

                            <div className="products">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product}/>
                                    ))}
                            </div>

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

                        </>
                    )
            }
        </>
    );
};

export default Products;