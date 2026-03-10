import { Request, Response } from 'express';
import { cartService } from './cart.service';
import sendResponse from '../../utils/sendResponse';
import sendError from '../../utils/sendError';
const addToCart = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const { mealId, quantity } = req.body;

            if (!mealId || !quantity || quantity < 1) {
                  throw new Error("mealId and valid quantity are required");
            }

            const result = await cartService.addToCart(userId, mealId, quantity);

            return sendResponse(res, 201, "Item add to the cart successfully.", result)

      } catch (error: any) {
            return sendError(res, 500, "Failed to add item to the cart!", error.message)
      }
};

const getMyCart = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            if (!userId) {
                  throw new Error("userId not found. you are not logged in");
            }
            const result = await cartService.getMyCart(userId as string);
            return sendResponse(res, 200, "Cart data fecthed successfully", result)
      } catch (error: any) {
            return sendError(res, 500, "Could not fetched cart data", error)
      }
}

export const cartController = {
      addToCart,
      getMyCart
}