import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { reviewsController } from './reviews.controller';

const router: Router = express.Router();

router.get("/", auth(UserRole.CUSTOMER), reviewsController.getMyAllReviews);

router.post("/", auth(UserRole.CUSTOMER), reviewsController.createReview);

export const reviewsRoutes = router;