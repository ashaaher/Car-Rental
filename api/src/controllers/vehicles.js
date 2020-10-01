import mongoose from "mongoose";
import Vehicle from "../models/vehicles";

export const getAll = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find().exec();
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
        const vehicle = new Vehicle({
            _id: new mongoose.Types.ObjectId(),
            make: req.body.make,
            model: req.body.model,
            licencePlateNumber: req.body.licencePlateNumber,
            mileage: req.body.mileage,
            stateOfRegistration: req.body.stateOfRegistration,
            condition: req.body.condition,
            locationId: req.body.locationId,
            vehicleTypeId: req.body.vehicleTypeId,

        });
        const createdVehicle = await vehicle.save();
        res.status(201).json(createdVehicle);
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
        const vehicle = await Vehicle.findById(id).exec();
        res.status(200).json(vehicle);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
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

        const updatedVehicle = await Vehicle.update({ _id: id }, { $set: updateOps }).exec();
        res.status(200).json(updatedVehicle);
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

        const deletedVehicle = await Vehicle.remove({ _id: id }).exec();
        res.status(200).json(deletedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}


export const search = async (req, res, next) => {
    try {
        const search = req.body.search || {};

        if (search.searchText || search.locationId) {
            const vehicles = await Vehicle.find(
                { $text: { $search: search.searchText } }
            ).find(search.locationId ? {
                locationId: search.locationId,
            } : {}).exec();
            res.status(200).json(vehicles);
        } else {
            res.status(400).json({
                error: "Search parameters not specified properly"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}
