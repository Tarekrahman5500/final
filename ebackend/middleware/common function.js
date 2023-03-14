const Product = require('../models/productModel')
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

exports.checkProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    req.product = product
    next()
})