import {useEffect, useState} from 'react'
import {Route, Routes} from "react-router-dom";
import './App.css'
import Header from "./components/layout/header/header.jsx";
import Footer from "./components/layout/footer/footer.jsx";
import Home from "./components/home/home.jsx";
import ProductDetails from "./components/product/product-details.jsx"
import Products from "./components/product/products.jsx"
import LoginSignUp from "./components/user/LoginSignUp.jsx";
import {useSelector} from "react-redux";
import store from "./store";
import {loadUser} from "./actions/userAction.js";
import WebFont from "webfontloader";
import Profile from "./components/user/profile.jsx"
function App() {

    const {isAuthenticated, user} = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        store.dispatch(loadUser(token));

    }, [token]);
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:keyword" element={<Products/>}/>
                <Route path="/login" element={<LoginSignUp/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
