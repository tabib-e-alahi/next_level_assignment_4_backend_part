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
      const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { status },
      });



      return
}

export const adminService = {
      getAllUsers,
      updateUserStatus
}