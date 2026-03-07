import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { UserRole } from '../../middlewares/auth';
import { mealsService } from './meals.service';
const createMeals = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (!user) {
                  return sendError(res, 401, "Unauthorized Access!")
            }
            if (user.role !== UserRole.PROVIDER) {
                  return sendError(res, 403, "Forbidden Access!")
            }

            const userId = user.id;
            const result = await mealsService.createMeals(req.body, userId as string);

            return res.status(201).json({
                  success: true,
                  message: "Meals added to your profile.",
                  data: result
            })
      } catch (error: any) {
            return sendError(res, 400, error.message)
      }

}
const updateMeals = () => {

}

const deleteMeals = () => {

}

export const mealsController = {
      createMeals,
      updateMeals,
      deleteMeals
}