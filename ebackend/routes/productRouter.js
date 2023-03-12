const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require('../controllers/productController')
const {checkProduct} = require("../middleware/common function");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"), checkProduct, updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"), checkProduct, deleteProduct)
    .get(isAuthenticatedUser, checkProduct, getProductDetails)


module.exports = router;