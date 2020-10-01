import mongoose from "mongoose";

const Booking = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    startTime: { type: Date, required: true },
    endTime: {type: Date, required: true },
    userId: { type: String, required: true, unique: true, dropDups: true }
});

export default mongoose.model('Booking', Booking);