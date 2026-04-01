import { Request, Response } from 'express';
import { UserRole } from '../../middlewares/auth';
import sendError from '../../utils/sendError';
import { providerService } from './provider.service';
import { isProviderAndActive } from '../../utils/provider_validation';
import { providerProfileFinder } from '../../utils/providerProfileFinder';
import { mealFinderFunction } from './mealFinderFunction';
import sendResponse from '../../utils/sendResponse';


const createProfile = async (req: Request, res: Response) => {
      try {

            const check = isProviderAndActive(req.user);

            if (!check.ok) {
                  return sendError(res, check.code as number, check.message as string);
            }

            const result = await providerService.createProfile(req.body, req.user.id);

            return sendResponse(res, 201, "Your provider profile is created successfully.", result)
      } catch (error: any) {
            return sendError(res, 400, "Provider Profile creation failed!!", error)
      }
}

const getAllProviders = async (req: Request, res: Response) => {
      try {
            const result = await providerService.getAllProviders();

            return sendResponse(res, 200, "Providers data fetched successfully!", result)
      } catch (error: any) {
            return sendError(res, 500, "Could not fetched providers data", error.message)
      }
}

const getProviderByIdPublic = async (req: Request, res: Response) => {
      try {
            const providerId = req.params.id;
            if (!providerId) {
                  throw new Error("Provider Id not found.")
            }

            const result = await providerService.getProviderByIdPublic(providerId as string);

            return sendResponse(res, 200, "Provider data fetched successfully.", result)
      } catch (error: any) {
            return sendError(res, 500, "Could not fetched provider data", error.message)
      }
}

//! ------------------- Meals Section ------------------------

const createMeals = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            const result = await providerService.createMeals(req.body, userId as string);

            return sendResponse(res, 200, "Meals added to your profile.", result)

      } catch (error: any) {
            return sendError(res, 400, "Meals creation failed!!", error)
      }
}

const getProviderAllMeals = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            //* find provider profile
            const provider = await providerProfileFinder(userId);

            if (!provider) {
                  return sendError(res, 404, "Provider profile not found")
            }


            const result = await providerService.getProviderAllMeals(provider.id);

            return sendResponse(res, 200, "Meals data fetched.", result)

      } catch (error: any) {
            return sendError(res, 400, "Could not fetched meals data", error)
      }
}
const getProviderSingleMeal = async (req: Request, res: Response) => {
      try {
            const userId = req.user.id;
            //* find provider profile
            const provider = await providerProfileFinder(userId);

            if (!provider) {
                  return sendError(res, 404, "Provider profile not found")
            }

            const mealId = req.params.id as string;

            const result = await providerService.getProviderSingleMeal(provider.id, mealId);

            return sendResponse(res, 200, "Meal data fetched.", result)

      } catch (error: any) {
            return sendError(res, 400, "Could not fetched meal data", error)
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

            return sendResponse(res, 200, "Meals updated.", result)

      } catch (error: any) {
            return sendError(res, 400, "Could not update meals data", error)
      }
}

const deleteMeals = async (req: Request, res: Response) => {
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


            const result = await providerService.deleteMeal(mealId)

            return sendResponse(res, 200, "Meal deleted successfully", result);
      } catch (error: any) {
            sendError(res, 400, "Failed to delete meal", error)
      }
}


//! ---------------- Orders Section --------------
const viewIncomingOrders = async (req: Request, res: Response) => {
      try {
            const isRoleProvider = isProviderAndActive(req.user);
            if (!isRoleProvider.ok) {
                  throw new Error(isRoleProvider.message);
            }

            const haveProviderProfile = await providerProfileFinder(req.user.id);
            if (!haveProviderProfile) {
                  throw new Error("You do not have any provder profile.First create a profile");
            }

            const providerId = haveProviderProfile.id;

            const result = await providerService.viewIncomingOrders(providerId);

            return sendResponse(res, 200, "Incoming Order data fetched", result)

      } catch (error) {
            return sendError(res, 500, "Could not get Incoming order data", error)
      }
}

const updateOrderStatus = async (req: Request, res: Response) => {
      try {
            const isRoleProvider = isProviderAndActive(req.user);
            if (!isRoleProvider.ok) {
                  throw new Error(isRoleProvider.message);
            }

            const haveProviderProfile = await providerProfileFinder(req.user.id);
            if (!haveProviderProfile) {
                  throw new Error("You do not have any provder profile.First create a profile");
            }

            const providerId = haveProviderProfile.id;

            const { status } = req.body;
            const orderId = req.params.id as string;

            if (!status || !["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"].includes(status)) {
                  return sendError(res, 400, "Invalid status provided. Allowed values: PLACED,PREPARING, READY, DELIVERED, CANCELLED", "Check your 'status' value.")
            }

            const result = await providerService.updateOrderStatus(orderId, status, providerId)

            return sendResponse(res, 201, "Order Status updated", result)

      } catch (error) {
            return sendError(res, 500, "Could not update order status", error)
      }
}
export const providerController = {
      createProfile,
      getAllProviders,
      getProviderByIdPublic,
      createMeals,
      getProviderAllMeals,
      getProviderSingleMeal,
      updateMeals,
      deleteMeals,
      viewIncomingOrders,
      updateOrderStatus
}