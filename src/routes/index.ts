import { Router } from "express";
import authRoutes from "./authRoutes"
import rideRoutes from "./rideRoutes"
import matchRoutes from "./matchRoutes"
import userRoutes from "./userRoutes"

const router = Router()

router.use("/auth", authRoutes)
router.use( rideRoutes)
router.use(matchRoutes)
router.use( userRoutes)

export default router;