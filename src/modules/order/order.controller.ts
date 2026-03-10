import { Request, Response } from 'express';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import sendError from '../../utils/sendError';

const createOrder = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            if (!userId) {
                  throw new Error("user id not found or you are not logged in");
            }

            const { deliveryAddress } = req.body;

            if (!deliveryAddress) {
                  throw new Error("Delivery address is required");
            }

            const result = await orderService.createOrder(userId, deliveryAddress)

            return sendResponse(res, 201, "Order placed successfully", result)
      } catch (error: any) {
            return sendError(res, 500, "Failed to place order", error)
      }
};

const getMyOrders = async(req: Request, res: Response) =>{
      try {
            const userId = req.user.id;
            if(!userId){
                  throw new Error("You are not logged in. Logged in first");
            }

            const result = await orderService.getMyOrders(userId);

            return sendResponse(res, 200, "order data fetched successfully", result)
            
      } catch (error) {
            return sendError(res, 500, "Could not get orders data", error)
      }
}

const getMyOrderById = async(req: Request, res: Response) =>{
      try {
            const userId = req.user.id;
            const orderId = req.params.id;
            if(!userId){
                  throw new Error("You are not logged in. Logged in first");
            }

            const result = await orderService.getMyOrderById(userId, orderId as string);

            return sendResponse(res, 200, "order data fetched successfully", result)
            
      } catch (error) {
            return sendError(res, 500, "Could not get orders data", error)
      }
}

export const orderController = {
      createOrder,
      getMyOrders,
      getMyOrderById
}