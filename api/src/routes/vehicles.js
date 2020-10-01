import express from "express";
import { 
    getAll, 
    create as createVehicle, 
    get as getVehicle,
    update as updateVehicle,
    _delete as deleteVehicle,
    search as searchVehicles 
} from '../controllers/vehicles';

const router = express.Router();

router.get("/", getAll);
router.post("/", createVehicle);
router.get("/:id", getVehicle);
router.patch("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.post("/search", searchVehicles);

export default router;
