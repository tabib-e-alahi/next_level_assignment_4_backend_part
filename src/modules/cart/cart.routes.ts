import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { cartController } from './cart.controller';

const router =  Router();

router.get("/", auth(UserRole.CUSTOMER), cartController.getMyCart);
router.post("/", auth(UserRole.CUSTOMER), cartController.addToCart);

router.patch("/items/:id", auth(UserRole.CUSTOMER), cartController.updateCartItem);
router.delete("/items/:id", auth(UserRole.CUSTOMER), cartController.removeCartItem);
router.delete("/", auth(UserRole.CUSTOMER), cartController.clearCartData);

export const cartRoutes:Router = router;