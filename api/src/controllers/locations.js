import mongoose from "mongoose";
import Location from "../models/locations";

export const getAll = async (req, res, next) => {
    try {
        const locations = await Location.find().exec();
        res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

export const create = async (req, res, next) => {
    try {
        const location = new Location({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address: req.body.address,
            capacity: req.body.capacity,
        });
        const createdLocation = await location.save();
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
        const id = req.params.id;
        const location = await Location.findById(id).exec();
        res.status(200).json(location);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
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

        const updatedLocation = await Location.update({ _id: id }, { $set: updateOps }).exec();
        res.status(200).json(updatedLocation);
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

        const deletedLocation = await Location.remove({ _id: id }).exec();
        res.status(200).json(deletedLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}
