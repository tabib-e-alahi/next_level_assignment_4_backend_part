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

export const adminService = {
      getAllUsers
}