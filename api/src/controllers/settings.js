import mongoose from "mongoose";
import Settings from "../models/settings";

export const create = async (req, res, next) => {
    try {
        // const setting = new Settings({
        //     membershipFee: req.body.membershipFee,
        //     lateFee: req.body.lateFee
        // });

        Settings.findOneAndUpdate({}, {
            membershipFee: req.body.membershipFee,
            lateFee: req.body.lateFee
        }, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.json({message: 'Succesfully saved.'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

export const get = async (req, res, next) => {
    try {
        // const setting = new Settings({
        //     membershipFee: req.body.membershipFee,
        //     lateFee: req.body.lateFee
        // });

        const settings = await Settings.find().exec();
        res.status(200).json(settings);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}