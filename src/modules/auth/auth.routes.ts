
import express, { Router } from 'express';
import { authController } from './auth.controller';

const router: Router = express.Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)

export const authRoutes = router;