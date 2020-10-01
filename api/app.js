// var createError = require('http-errors');
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import basicAuth from './lib/basicAuth'; 
import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import vehicleTypeRouter from './src/routes/vehicleTypes';
import locationRouter from './src/routes/locations';
import vehiclesRouter from './src/routes/vehicles';
import settingsRouter from './src/routes/settings';
import bookingsRouter from './src/routes/bookings';

const app = express();

mongoose.connect(
    "mongodb+srv://vijaylad:6ntb!W52EwwrL.C@cluster-vijaylad-w3gwx.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// adding middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(basicAuth)
// handling cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// adding routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/vehicletypes', vehicleTypeRouter);
app.use('/api/locations', locationRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/bookings', bookingsRouter);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

// error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;
