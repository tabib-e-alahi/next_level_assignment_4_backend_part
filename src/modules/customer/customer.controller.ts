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
      return res.status(400).json({
        success: false,
        message: "At least one field (name, email, phone) is required to update",
      });
    }

    // Check if the email is already in use by another user (if email is being updated)
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another user",
        });
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        phone,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const customerController = {
      getProfile,
      
}