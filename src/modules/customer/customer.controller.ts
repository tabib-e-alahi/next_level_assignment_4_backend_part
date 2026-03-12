import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { customerService } from './customer.service';
import sendResponse from '../../utils/sendResponse';
const getProfile = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const result = await customerService.getProfile(userId);

            return sendResponse(res, 200, "Customer data fetched successfully", result)
      } catch (error) {
            return sendError(res, 500, "Could not get profile data", error)
      }
}

export const customerController = {
      getProfile
}