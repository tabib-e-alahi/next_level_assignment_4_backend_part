import { Request, Response } from 'express';
import { UserRole } from '../../middlewares/auth';
import sendError from '../../utils/sendError';
import { providerService } from './provider.service';
import { isProviderAndActive } from '../../utils/provider_validation';
import { providerProfileFinder } from '../../utils/providerProfileFinder';
import { mealFinderFunction } from './mealFinderFunction';


const createProfile = async (req: Request, res: Response) => {
      try {

            const check = isProviderAndActive(req.user);

            if (!check.ok) {
                  return sendError(res, check.code as number, check.message as string);
            }

            const result = await providerService.createProfile(req.body, req.user.id);

            return res.status(201).json({
                  success: true,
                  message: "Your provider is created successfully.",
                  data: result
            })
      } catch (error: any) {
            return sendError(res, 400, error.message as string)
      }
}

//! ------------------- Meals Section ------------------------

const createMeals = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const result = await providerService.createMeals(req.body, userId as string);

            return res.status(201).json({
                  success: true,
                  message: "Meals added to your profile.",
                  data: result
            })

      } catch (error: any) {
            return sendError(res, 400, error.message)
      }
}

const updateMeals = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const mealId = req.params.id as string;

            //* find provider profile
            const provider = await providerProfileFinder(userId);

            if (!provider) {
                  return sendError(res, 404, "Provider profile not found")
            }

            //* find meal with the meal id
            const existingMeal = await mealFinderFunction(mealId);

            if (!existingMeal) {
                  return sendError(res, 404, "Meal not found")
            }

            //* meal ownership ckeing
            if (provider.id !== existingMeal.providerId) {
                  return sendError(res, 403, "Forbidden Access!!! You are not the owner.")
            }

            const result = await providerService.updateMeals(req.body, mealId);

            return res.status(200).json({
                  success: true,
                  message: "Meals updated.",
                  data: result
            })

      } catch (error: any) {
            return sendError(res, 400, error.message)
      }
}

const deleteMeals = () => {

}

export const providerController = {
      createProfile,
      createMeals,
      updateMeals,
      deleteMeals
}