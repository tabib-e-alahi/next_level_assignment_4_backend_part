import express, { Router } from 'express';
import { publicController } from './public.controller';

const router: Router = express.Router()

// get all categories
router.get("/categories", publicController.getAllCatgeories);

// get all providers
router.get("/providers", publicController.getAllProviders)

// get all meals
router.get("/meals", publicController.getAllMeals)

//get dietaryPreferences 
router.get("/dietaryPreferences", publicController.getDietaryPreferences)

export const publicRoutes = router;