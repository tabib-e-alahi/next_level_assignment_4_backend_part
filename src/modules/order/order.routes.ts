import { Router } from "express";
import express from 'express';
import auth, { UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router =  Router();

router.get("/", auth(UserRole.CUSTOMER), orderController.getMyOrders);
router.get("/:id", auth(UserRole.CUSTOMER), orderController.getMyOrderById);

router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);



export const orderRoutes:Router = router;

