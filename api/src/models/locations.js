import mongoose from "mongoose";

const Location = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true }
});

export default mongoose.model('Location', Location);