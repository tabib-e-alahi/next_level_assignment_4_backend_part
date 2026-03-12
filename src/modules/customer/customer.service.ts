import { prisma } from "../../lib/prisma";

const getProfile = async (userId: string | undefined) => {
      if (!userId) {
            throw new Error("Invalid userid");
      }

      const result = await prisma.user.findUnique({
            where: {
                  id: userId
            },
            select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
            },
      })

      if(!result){
            throw new Error("Customer data not found");
      }

      return result;
}

const updateProfile = async ({userId, name, email, password}:{
      userId: string | undefined
      name: string | undefined
      email: string | undefined
} ) => {
 

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
 
};

export const customerService = {
      getProfile,
      updateProfile
}