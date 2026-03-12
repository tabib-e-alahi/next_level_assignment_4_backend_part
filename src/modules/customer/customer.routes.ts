import express, { Router } from 'express';
import { customerController } from './customer.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router: Router = express.Router();

router.get("/profile", auth(UserRole.CUSTOMER), customerController.getProfile);
router.put("/profile", auth(UserRole.CUSTOMER), customerController.updateProfile);

export const customerRoutes = router;