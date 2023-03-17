import {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import './App.css'
import Header from "./components/layout/header/header.jsx";
import Footer from "./components/layout/footer/footer.jsx";
import Home from "./components/home/home.jsx";
import ProductDetails from "./components/product/product-details.jsx"
function App() {
    return (
        <div>
            <Header/>
            <Routes>
                 <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                 <Route path="/product/:id" element={<ProductDetails/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
