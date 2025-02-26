import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { matchSchema } from '../validations/matchValidation';
import { matchRiderWithDriver } from '../controllers/matchController';
import { authorizeRole } from '../middleware/roleMiddleware';

const router = express.Router()


router.post("/match", authenticateUser,authorizeRole(["RIDER"]), validate(matchSchema),  matchRiderWithDriver)

export default router;