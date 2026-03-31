import bcrypt from "bcryptjs";
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

const updateProfile = async ({
      userId,
      name,
      phone,
      currentPassword,
      newPassword,
}: {
      userId: string;
      name?: string;
      phone?: string;
      currentPassword?: string;
      newPassword?: string;
}) => {
      const dataToUpdate: {
            name?: string;
            phone?: string;
            password?: string;
      } = {};

      if (name !== undefined) dataToUpdate.name = name;
      if (phone !== undefined) dataToUpdate.phone = phone;

      if (currentPassword || newPassword) {
            if (!currentPassword || !newPassword) {
                  throw new Error("Current and new password are required.");
            }

            const existingUser = await prisma.user.findUnique({
                  where: { id: userId },
                  select: { password: true },
            });

            if (!existingUser) {
                  throw new Error("User not found!");
            }

            const matchPassword = await bcrypt.compare(
                  currentPassword,
                  existingUser.password
            );

            if (!matchPassword) {
                  throw new Error("Invalid current password!");
            }

            dataToUpdate.password = await bcrypt.hash(newPassword, 10);
      }

      const result = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
      });

      return result;
};

const cancelOrder = async (userId: string, orderId: string) => {
      const orderData = await prisma.order.findUnique({
            where: {
                  id: orderId,
            },
            include: {
                  orderItems: true,
            },
      });

      if (!orderData) {
            throw new Error("Order not found");
      }

      if (orderData.customerId !== userId) {
            throw new Error("You can only cancel your own orders")
      }

      if (!["PLACED", "PREPARING"].includes(orderData.status)) {
            throw new Error("You can only cancel orders that are in 'PLACED' or 'PREPARING' status")
      }

      const result = await prisma.order.update({
            where: {
                  id: orderId,
            },
            data: {
                  status: "CANCELLED",
            },
      });

      return result;
};

export const customerService = {
      getProfile,
      updateProfile,
      cancelOrder
}