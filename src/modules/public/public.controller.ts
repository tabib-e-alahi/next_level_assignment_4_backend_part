import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { publicService } from './public.service';
import sendResponse from '../../utils/sendResponse';


const getAllCatgeories = async (req: Request, res: Response) => {
      try {
            const limit = req.query.limit as string | undefined;

            const result = await publicService.getAllCatgeories(limit);

            return sendResponse(res, 200, "category data fecthed", result)
      } catch (error) {
            sendError(res, 500, "Could not fetched categories", error)
      }
}


const getAllProviders = async (req: Request, res: Response) => {
      try {

            const limit = req.query.limit as string | undefined;

            const result = await publicService.getAllProviders(limit);

            return sendResponse(res, 200, "Provider data fetched", result)
      } catch (error) {
            sendError(res, 500, "Could not fetched providers", error)
      }
}



const getAllMeals = async (req: Request, res: Response) => {
      try {
            const { search } = req.query
            const searchString = typeof search === 'string' ? search : undefined
            const dietaryTags = req.query.dietaryTags ? (req.query.dietaryTags as string).split(",") : [];
            const categoryId = req.query.categoryId as string | undefined
            const minPrice = req.query.minPrice as string | undefined
            const maxPrice = req.query.maxPrice as string | undefined

            const result = await publicService.getAllMeals({ search: searchString, categoryId, dietaryTags, minPrice, maxPrice });

            return sendResponse(res, 200, "Meals data fetched successfully.", result);
      } catch (error) {
            return sendError(res, 500, "Could not fetch meals data", error)
      }
}

const getDietaryPreferences = async (req: Request, res: Response) => {
      try {
            const result = await publicService.getDietaryPreferences();

            return sendResponse(res, 200, "Dietary Preferences fetched successfully.", result);
      } catch (error) {
            return sendError(res, 500, "Could not fetch dietary data", error)
      }
}

export const publicController = {
      getAllCatgeories,
      getAllProviders,
      getAllMeals,
      getDietaryPreferences
}