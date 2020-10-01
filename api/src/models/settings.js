import mongoose from "mongoose";

const Settings = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    membershipFee: { type: Number, required: true },
    lateFee: { type: Number, required: true },
});

export default mongoose.model('Settings', Settings);