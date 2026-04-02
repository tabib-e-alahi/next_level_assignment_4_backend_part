import express, { Router } from 'express';
import { adminController } from './admin.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router: Router = express.Router();

//get all users
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);

router.patch("/update-status/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus);

//get all orders
router.get("/orders", auth(UserRole.ADMIN), adminController.getAllOrders);

// category management routes

router.post("/categories", auth(UserRole.ADMIN), adminController.createCategory);

router.patch("/categories/:id", auth(UserRole.ADMIN), adminController.updateCategory);

router.delete("/categories/:id", auth(UserRole.ADMIN), adminController.deleteCategory);

export const adminRoutes = router;