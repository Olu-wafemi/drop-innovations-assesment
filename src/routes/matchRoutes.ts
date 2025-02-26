import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { matchSchema } from '../validations/matchValidation';
import { matchRiderWithDriver } from '../controllers/matchController';

const router = express.Router()


router.post("/match", authenticateUser, validate(matchSchema), matchRiderWithDriver)

export default router;