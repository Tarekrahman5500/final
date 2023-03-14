const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRoute')
const errorMiddleware = require('./middleware/error')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/', usersRouter);
app.use('/api/v1/', productsRouter)
app.use('/api/v1/', orderRouter)
// handle error
app.use(errorMiddleware)

module.exports = app;
