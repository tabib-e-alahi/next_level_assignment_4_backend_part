
import express, { Router } from 'express';
import { authController } from './auth.controller';

const router: Router = express.Router();

router.post("/register", authController.registerUser)

export const authRoutes = router;