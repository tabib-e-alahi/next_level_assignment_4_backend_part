import { Request, Response } from 'express';
import { reviewsService } from './reviews.service';
import sendResponse from '../../utils/sendResponse';
import sendError from '../../utils/sendError';

const createReview = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            if (!userId) {
                  throw new Error("Your are not logged in.");
            }

            const { orderItemId, mealId, rating, comment } = req.body;
            if (!mealId) {
                  throw new Error("mealId and rating is required");
            }
            if (!rating) {
                  throw new Error("rating is required");
            }

            const result = await reviewsService.createReview({ userId, orderItemId, mealId, rating, comment });

            return sendResponse(res, 201, "review added", result);

      } catch (error) {
            return sendError(res, 500, "Failded to add review", error)

      }
}

export const reviewsController = {
      createReview
}