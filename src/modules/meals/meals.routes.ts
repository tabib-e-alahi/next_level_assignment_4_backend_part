import express, { Router } from 'express';
import { mealsController } from './meals.controller';
const router: Router = express.Router();



//! ------------- Public Routes ----------- //
router.get("/meals", mealsController.getAllMeals)

//! need to rethink, will be done in order or here
// PATCH	/api/provider/orders/:id	Update order status

export const mealsRoutes = router;