import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { getUserRides } from '../controllers/rideController';


const router = express.Router()

router.get("/users/:id/rides", authenticateUser, getUserRides)

export default router;