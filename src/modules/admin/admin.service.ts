import { Status } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
      const customers = await prisma.user.findMany({
            where: {
                  role: "CUSTOMER"
            },
            include: {
                  _count: true
            }
      });

      const providers = await prisma.user.findMany({
            where: {
                  role: "PROVIDER"
            },
            include: {
                  providerProfiles: true,
            }
      });

      return {
            customers, providers
      }
}
const updateUserStatus = async (userId: string, status: Status) => {
      const result = await prisma.user.update({
            where: { id: userId },
            data: { status },
      });

      return result
}

const getAllOrders = async () => {
      const result = await prisma.order.findMany({
            include: {
                  orderItems: {
                        include: {
                              meal: true,
                        },
                  },
            },
            orderBy: {
                  createdAt: "desc", // Sorting orders by creation date
            },
      });

      return result
};

const createCategory = async (category: string) => {
      const existingCategory = await prisma.category.findUnique({
            where: { name: category },
      });

      if (existingCategory) {
            throw new Error(`${category} category is already existed`);
      }

      const result = await prisma.category.create({
            data: { name: category },
      });

      return result;
}

const updateCategory = async (categoryId: string, category: string) => {
      const existing
      const result = await prisma.category.update({
            where: { id: categoryId },
            data: { name: category },
      });

      return result
};

export const adminService = {
      getAllUsers,
      updateUserStatus,
      getAllOrders,
      createCategory,
      updateCategory
}