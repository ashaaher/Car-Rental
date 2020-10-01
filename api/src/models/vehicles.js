import mongoose from "mongoose";

const Vehicle = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    make: { type: String, required: true },
    model: { type: String, required: true },
    licencePlateNumber: { type: String },
    mileage: { type: Number },
    stateOfRegistration: { type: String },
    condition: { type: String },
    locationId: { type : mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    vehicleTypeId: { type : mongoose.Schema.Types.ObjectId, ref: 'VehicleType', required: true }
});

Vehicle.index({make: 'text', model: 'text'});

export default mongoose.model('Vehicle', Vehicle);
