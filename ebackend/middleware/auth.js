const User = require('../models/userModel')
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const jwt = require("jsonwebtoken");

require('dotenv').config({path: "ebackend/config/.env"});

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    // console.log(req.header("Authorization"))
    // const token = req.header("Authorization");
    let token

    if (!req.header("Authorization")) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
   // if (req.cookies) token = req.cookies.token;
    else token = req.header("Authorization")
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource `,
                    403
                )
            );
        }

        next();
    };
};