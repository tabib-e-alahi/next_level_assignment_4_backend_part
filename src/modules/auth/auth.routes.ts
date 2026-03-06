
import express, { Router } from 'express';
import { authController } from './auth.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router: Router = express.Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/me", auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), authController.getCurrentUser)

export const authRoutes = router;