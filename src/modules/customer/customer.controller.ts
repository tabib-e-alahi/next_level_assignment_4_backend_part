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

const updateProfile = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;  // Get the authenticated user's ID
            const { name, email, phone } = req.body;

            // Validate the required fields (if needed)
            if (!name && !email && !phone) {
                  return sendError(res, 400, "At least one field (name, email, phone) is required to update")
            }

            const result = await customerService.updateProfile({userId, name, email, phone})

            return sendResponse(res, 200, "Customer data updated", result)

      } catch (error) {
            console.error(error);
            return sendError(res, 500, "Failed to update profile", error)
      }
};

export const customerController = {
      getProfile,
      updateProfile

}