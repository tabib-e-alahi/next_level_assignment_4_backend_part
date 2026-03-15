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
            const userId = req.user.id;  
            const { name, email, phone } = req.body;

            if (!name && !email && !phone) {
                  return sendError(res, 400, "At least one field (name, email, phone) is required to update")
            }

            const result = await customerService.updateProfile({ userId, name, email, phone })

            return sendResponse(res, 200, "Customer data updated", result)

      } catch (error) {
            console.error(error);
            return sendError(res, 500, "Failed to update profile", error)
      }
};

const cancelOrder = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const orderId = req.params.id;
            if (!orderId) {
                  return sendError(res, 400, "Order ID is required")
            }
            const result = await customerService.cancelOrder(userId, orderId as string)

            return sendResponse(res, 200, "Order cancelled successfully", result)
      } catch (error) {
            return sendError(res, 500, "Failed to cancel order", error)
      }
};

export const customerController = {
      getProfile,
      updateProfile,
      cancelOrder

}