const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRoute')
const errorMiddleware = require('./middleware/error')
const cors = require("cors");


app.use(logger('dev'));

const api = process.env.API_URL || 'http://127.0.0.1:3000'
//handle cors policy
app.use(cors({
    credentials: true,
    origin: api,
    method: "GET,POST,PUT,PATCH,DELETE",

}))
/*

 */
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: false}));
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use('/', indexRouter);
app.use('/api/v1/', usersRouter);
app.use('/api/v1/', productsRouter)
app.use('/api/v1/', orderRouter)
// handle error
app.use(errorMiddleware)

module.exports = app;
