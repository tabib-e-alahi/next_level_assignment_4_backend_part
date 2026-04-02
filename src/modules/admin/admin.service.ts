import { Status } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {

      const customers = await prisma.user.findMany({
            where: {
                  role: "CUSTOMER"
            },
            select: {
                  id: true,
                  name: true,
                  phone: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
                  role: true,
                  _count: {
                        select: {
                              orders: true
                        }
                  },
            }
      });

      const providers = await prisma.user.findMany({
            where: {
                  role: "PROVIDER"
            },
            select: {
                  id: true,
                  name: true,
                  phone: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
                  role: true,
                  providerProfiles: {
                        select: {
                              _count: {
                                    select: {
                                          meals: true,
                                    }
                              },
                        }
                  }
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
                  createdAt: "desc",
            },
      });

      return result
};

const createCategory = async (categoryName: string, slug?: string, description?: string, logo?: string) => {
      const existingCategory = await prisma.category.findUnique({
            where: { name: categoryName },
      });

      if (existingCategory) {
            throw new Error(`${categoryName} category is already existed`);
      }

      const result = await prisma.category.create({
            data: {
                  name: categoryName,
                  slug: slug ?? "",
                  description: description ?? "",
                  logo: logo ?? ""
            },
      });

      return result;
}

const updateCategory = async (categoryId: string, categoryName: string, slug?: string, description?: string, logo?: string) => {

      const existingCategory = await prisma.category.findUnique({
            where: { name: categoryName }
      });

      if (existingCategory) {
            throw new Error("This category is already existed.")
      }

      const result = await prisma.category.update({
            where: { id: categoryId },
            data: {
                  name: categoryName,
                  slug: slug ?? "",
                  description: description ?? "",
                  logo: logo ?? ""
            },
      });

      return result
};

const deleteCategory = async (categoryId: string) => {

      const result = await prisma.category.delete({
            where: { id: categoryId }
      });

      return result
};

export const adminService = {
      getAllUsers,
      updateUserStatus,
      getAllOrders,
      createCategory,
      updateCategory,
      deleteCategory
}