import express, { Router } from 'express';
import { publicController } from './public.controller';

const router: Router = express.Router()

// get all categories
router.get("/categories", publicController.getAllCatgeories);

export const publicRoutes = router;