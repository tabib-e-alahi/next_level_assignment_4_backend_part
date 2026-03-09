import { Request, Response } from 'express';
import { mealsService } from './meals.service';
import sendResponse from '../../utils/sendResponse';
import sendError from '../../utils/sendError';

const getAllMeals = async (req: Request, res: Response) => {
      try {
            const { search } = req.query
            const searchString = typeof search === 'string' ? search : undefined

            const cuisine = req.query.cuisine as string | undefined

            console.log(searchString, cuisine);

            const result = await mealsService.getAllMeals();

            return sendResponse(res, 200, "Meals data fetched successfully.", result);
      } catch (error) {
            return sendError(res, 500, "Could not fetch meals data", error)
      }
}

export const mealsController = {
      getAllMeals
}