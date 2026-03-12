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

      if (!result) {
            throw new Error("Customer data not found");
      }

      return result;
}

const updateProfile = async ({ userId, name, email, phone }: {
      userId: string | undefined
      name: string | undefined
      email: string | undefined
      phone: string | undefined
}) => {

      if (!name && !email && !phone) {
            throw new Error("At least one field (name, email, phone) is required to update");
      }

      if (email) {
            const existingUser = await prisma.user.findUnique({
                  where: {
                        email,
                  },
            });

            if (existingUser && existingUser.id !== userId) {
                  throw new Error("Email is already in use by another user")
            }
      }

      // Update user profile
      const result = await prisma.user.update({
            where: {
                  id: userId,
            },
            data: {
                  name: 
            },
      });

      return result;

};

export const customerService = {
      getProfile,
      updateProfile
}