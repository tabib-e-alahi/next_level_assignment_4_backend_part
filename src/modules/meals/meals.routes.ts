import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { mealsController } from './meals.controller';
const router: Router = express.Router();

//TODO: Need to comple
router.post("/meals", auth(UserRole.PROVIDER), mealsController.createMeals);

//TODO: Need to comple
router.put("/meals/:id", auth(UserRole.PROVIDER), mealsController.updateMeals);
// //TODO: Need to comple
// router.patch("/meals/:id", auth(UserRole.PROVIDER), mealsController.createMeals);
//TODO: Need to comple
router.delete("/meals", auth(UserRole.PROVIDER), mealsController.deleteMeals);

//! need to rethink, will be done in order or here
// PATCH	/api/provider/orders/:id	Update order status

export const mealsRoutes = router;