import { Request, Response } from 'express';
import { UserRole } from '../../middlewares/auth';
import sendError from '../../utils/sendError';
import { providerService } from './provider.service';
import { isProviderAndActive } from '../../utils/provider_validation';


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
            const user = req.user;
            if (!user) {
                  return sendError(res, 401, "Unauthorized Access!")
            }
            if (user.role !== UserRole.PROVIDER) {
                  return sendError(res, 403, "Forbidden Access!")
            }
            if (user.status !== "ACTIVE") {
                  return sendError(res, 403, "Forbidden!!! Your account is not active.")
            }

            const userId = user.id;
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
            const user = req.user;
            if (!user) {
                  return sendError(res, 401, "Unauthorized Access!")
            }
            if (user.role !== UserRole.PROVIDER) {
                  return sendError(res, 403, "Forbidden Access!")
            }

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