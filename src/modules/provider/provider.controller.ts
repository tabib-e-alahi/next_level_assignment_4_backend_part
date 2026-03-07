import { Request, Response } from 'express';
import { UserRole } from '../../middlewares/auth';
import sendError from '../../utils/sendError';
import { providerService } from './provider.service';
const createProfile = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (!user) {
                  return sendError(res, 401, "Unauthorized Access!")
            }
            if (user.role !== UserRole.PROVIDER) {
                  return sendError(res, 403, "Forbidden!!! Only for provider.")
            }

            if(user.status !== "ACTIVE"){
                  return sendError(res, 403, "Forbidden!!! Your account is not active.")
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


export const providerController = {
      createProfile,
}