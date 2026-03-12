import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { UserRole } from '../../middlewares/auth';
import { adminService } from './admin.service';
import sendResponse from '../../utils/sendResponse';

const getAllUsers = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (user.role !== UserRole.ADMIN) {
                  return sendError(res, 403, "Forbidden Access!! Only for Admin.")
            }

            const result = await adminService.getAllUsers();

            return sendResponse(res, 200, "Both customer and provider data fetched!", result)
      } catch (error) {
            return sendError(res, 500, "Could not fetched users data", error)
      }
}
const updateUserStatus = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (user.role !== UserRole.ADMIN) {
                  return sendError(res, 403, "Forbidden Access!! Only for Admin.")
            }

            const userId = req.params.id as string;
            const { status } = req.body;

            if (!status || !["ACTIVE", "SUSPENDED"].includes(status)) {
                  return sendError(res, 400, "Invalid status. Allowed values: ACTIVE, SUSPENDED")
            }

            const result = await adminService.updateUserStatus(userId, status);

            return sendResponse(res, 200, "User status updated", result)
      } catch (error) {
            return sendError(res, 500, "Could not update user status", error)
      }
}

const getAllOrders = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (user.role !== UserRole.ADMIN) {
                  return sendError(res, 403, "Forbidden Access!! Only for Admin.")
            }

            const result = await adminService.getAllOrders();

            return sendResponse(res, 200, "Orders fetched successfully", result);
      } catch (error) {
            console.error(error);
            return sendError(res, 500, "Failed to fetch orders", error)
      }
};

const createCategory = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (user.role !== UserRole.ADMIN) {
                  return sendError(res, 403, "Forbidden Access!! Only for Admin.")
            }
            const { category } = req.body;

            if (!category) {
                  return sendError(res, 400, "Category name is required");
            }
            const result = await adminService.createCategory(category.toUpperCase());

            return sendResponse(res, 201, "Categoyy created successfully", result);

      } catch (error) {
            console.error(error);
            return sendError(res, 500, "Failed to create", error)
      }
};

const updateCategory = async (req: Request, res: Response) => {
      try {
            const categoryId = req.params.id as string;
            const { category } = req.body;

            if (!category) {
                  return sendError(res, 400, "Category name is required");
            }

            const result = await adminService.updateCategory(categoryId, category.toUpperCase())

            return sendResponse(res, 200, "Category updated successfully", result)
      } catch (error) {
            return sendError(res, 500, "Failed to update category", error)
      }
};

const deleteCategory = async (req: Request, res: Response) => {
      try {
            const categoryId = req.params.id as string;
    
            const result = await adminService.deleteCategory(categoryId);

            return sendResponse(res, 200, "Category deleted.", result)
      } catch (error) {
            return sendError(res, 500, "Failed to delete category", error)
      }
};

export const adminController = {
      getAllUsers,
      updateUserStatus,
      getAllOrders,
      createCategory,
      updateCategory,
      deleteCategory
}