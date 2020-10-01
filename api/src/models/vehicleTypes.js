import mongoose from "mongoose";

var RateSchema = new mongoose.Schema({ 
    start: Number, 
    end: Number, 
    rate: Number 
});

const VehicleTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: String,
    rates: {
        type: [RateSchema], 
        required: true
    }
});

export default mongoose.model('VehicleType', VehicleTypeSchema);