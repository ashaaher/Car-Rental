import express from "express";
import {
    getAll as getAllBookings,
    create as createBooking,
    get as getByUser,
    calculate as calculatePrice,
    _delete as deleteBooking
} from '../controllers/bookings';

const router = express.Router();

router.get("/", getAllBookings);
router.post("/", createBooking);
router.get("/:userId", getByUser);
router.get("/:id/price/:endTime", calculatePrice);
router.delete("/:id", deleteBooking);

export default router;
