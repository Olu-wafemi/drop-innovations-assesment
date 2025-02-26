import express from "express"
import {createRide, getAvailableRides,acceptRide, completeRide} from "../controllers/rideController";
import {validate} from "../middleware/validateMiddleware";
import {rideSchema} from "../validations/rideValidation";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";

const router = express.Router();
router.post("/rides", authenticateUser, authorizeRole(["RIDER"]), validate(rideSchema), createRide)
router.get("/rides", authenticateUser,authorizeRole(["DRIVER"]), getAvailableRides);
router.patch("/rides/:id/accept", authenticateUser, authorizeRole(["DRIVER"]), acceptRide)
router.patch("/rides/:id/complete", authenticateUser, authorizeRole(["DRIVER"]), completeRide)

export default router;