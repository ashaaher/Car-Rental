import mongoose from "mongoose";
import VehicleType from "../models/vehicleTypes";

export const getAll = async (req, res, next) => {
    try {
        const vehicles = await VehicleType.find().exec();
        res.status(200).json(vehicles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const create = async (req, res, next) => {
    try {
        const vehicleType = new VehicleType({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            rates: req.body.rates,
        });
        const createdVehicleType = await vehicleType.save();
        res.status(201).json(createdVehicleType);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const vehicleType = await VehicleType.findById(id).exec();
        res.status(200).json(vehicleType);

    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

export const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }

        const updatedVehicleType = await VehicleType.update({ _id: id }, { $set: updateOps }).exec();
        res.status(200).json(updatedVehicleType);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const _delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedVehicleType = await VehicleType.remove({ _id: id }).exec();
        res.status(200).json(deletedVehicleType);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}
