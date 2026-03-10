import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { cartController } from './cart.controller';

const router: Router = express.Router()

router.get("/", auth(UserRole.CUSTOMER), cartController.getMyCart);
router.post("/", auth(UserRole.CUSTOMER), cartController.addToCart);

// router.patch("/cart/items/:id", auth(UserRole.CUSTOMER), cartController.updateCartItem);
// router.delete("/cart/items/:id", auth(UserRole.CUSTOMER), cartController.removeCartItem);
// router.delete("/cart", auth(UserRole.CUSTOMER), cartController.clearCart);

export const cartRoutes = router;