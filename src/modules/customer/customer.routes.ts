import express, { Router } from 'express';
import { customerController } from './customer.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router =  Router();

router.get("/profile", auth(UserRole.CUSTOMER), customerController.getProfile);
router.put("/profile", auth(UserRole.CUSTOMER), customerController.updateProfile);

router.get("/orders", auth(UserRole.CUSTOMER), customerController.cancelOrder);
router.patch("/orders/cancel/:id", auth(UserRole.CUSTOMER), customerController.cancelOrder);

export const customerRoutes:Router = router;