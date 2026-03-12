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

export const customerService = {
      getProfile
}