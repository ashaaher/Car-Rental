import express from "express";
import { 
    getAll, 
    create as createLocation, 
    get as getLocation,
    update as updateLocation,
    _delete as deleteLocation 
} from '../controllers/locations';

const router = express.Router();

router.get("/", getAll);
router.post("/", createLocation);
router.get("/:id", getLocation);
router.patch("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
