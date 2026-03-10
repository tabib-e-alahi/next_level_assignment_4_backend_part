import { Router } from "express";
import express from 'express';
import auth, { UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router: Router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);

export const orderRoutes = router;

