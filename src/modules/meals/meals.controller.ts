import { Request, Response } from 'express';
import { mealsService } from './meals.service';
import sendResponse from '../../utils/sendResponse';
import sendError from '../../utils/sendError';

const getAllMeals = async (req: Request, res: Response) => {
      try {
            const { search } = req.query
            const searchString = typeof search === 'string' ? search : undefined
            const dietaryTags = req.query.dietaryTags ? (req.query.dietaryTags as string).split(",") : [];
            const cuisine = req.query.cuisine as string | undefined
            const minPrice = req.query.minPrice as string | undefined
            const maxPrice = req.query.maxPrice as string | undefined

            const result = await mealsService.getAllMeals({ search: searchString, cuisine, dietaryTags, minPrice, maxPrice });

            return sendResponse(res, 200, "Meals data fetched successfully.", result);
      } catch (error) {
            return sendError(res, 500, "Could not fetch meals data", error)
      }
}

export const mealsController = {
      getAllMeals
}