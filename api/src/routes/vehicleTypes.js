import express from "express";
import { 
    getAll, 
    create as createVehicleType, 
    get as getVehicleType,
    update as updateVehicleType,
    _delete as deleteVehicleType 
} from '../controllers/vehicleTypes';

const router = express.Router();

router.get("/", getAll);
router.post("/", createVehicleType);
router.get("/:id", getVehicleType);
router.patch("/:id", updateVehicleType);
router.delete("/:id", deleteVehicleType);

export default router;
