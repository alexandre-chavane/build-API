const express = require('express');

const morgan = require('morgan');
const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/tourRoutes');

const app = express();

// Http func, url, status code time and size

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello From Middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
