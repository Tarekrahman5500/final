const Product = require('../models/productModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")
// create product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    return res.status(201).json({success: 'true', product})

})
// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    // const apiFeatures =
    const resultPerPage = 5
    const productCount = await Product.countDocuments()
    const products = await (new ApiFeatures(Product.find(), req.query)
        .search().filter().pagination(resultPerPage)).query
    return res.status(201).json({success: 'true', products, productCount})
})

// get a single product

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = req.product
    return res.status(201).json({success: 'true', product})

})

// update a product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = req.product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(200).json({success: 'true', product})

})

// remove a product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findByIdAndRemove(req.params.id)
    return res.status(200).json({success: 'true', message: 'product deleted successfully'})

})