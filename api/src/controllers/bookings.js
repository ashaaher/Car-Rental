import mongoose from "mongoose";
import Booking from "../models/bookings";
import Vehicle from "../models/vehicles";
import VehicleType from "../models/vehicleTypes";
import Settings from "../models/settings";

export const getAll = async (req, res, next) => {
    try {
        const bookings = await Booking.find().exec();
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}


export const create = async (req, res, next) => {
    try {
        const booking = new Booking({
            _id: new mongoose.Types.ObjectId(),
            vehicleId: req.body.vehicleId,
            startTime: new Date(req.body.startTime),
            endTime: new Date(req.body.endTime),
            userId: req.body.userId,
        });
        const createdLocation = await booking.save();
        res.status(201).json(createdLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

export const get = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const booking = await Booking.find({ userId: userId }).limit(1).exec();
        res.status(200).json(booking);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

export const calculate = async (req, res, next) => {
    try {
        let price = 0;
        const actualEndTime = new Date(req.params.endTime);
        const bookingId = req.params.id;

        const booking = await Booking.findById(bookingId).exec();
        const vehicle = await Vehicle.findById(booking.vehicleId).exec();
        const vehicleType = await VehicleType.findById(vehicle.vehicleTypeId).exec();
        let hours = Math.floor(actualEndTime - booking.startTime) / 36e5;
        
        if(hours < 1 && hours >= -1) {
            hours = 1
        }

        if(hours < -1) {
            hours = 0
        }

        const inRange = (x, min, max) => {
            return ((x-min)*(x-max) <= 0);
        }
        let ratePerhour = vehicleType.rates[0].rate;

        vehicleType.rates.forEach(rate => {
            if(inRange(hours, rate.start, rate.end)) {
                ratePerhour = rate.rate;
            }
        })
        price = ratePerhour * hours;
        let lateFee = 0;
        if(actualEndTime > booking.endTime) {
            const settings = await Settings.find().exec();
            lateFee = settings[0]['lateFee']
            price = price + lateFee;
        }
        res.status(200).json({
            totalPrice: price,
            totalHours: hours,
            lateFee
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

export const _delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBooking = await Booking.remove({ _id: id }).exec();
        res.status(200).json(deletedBooking);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}
