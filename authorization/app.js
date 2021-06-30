const express = require('express');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/appError');

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


module.exports = app;