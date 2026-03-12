import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
      const customers = await prisma.user.findMany({
            where: {
                  role: "CUSTOMER"
            },
            include:{
                  _count:
            }
      });
}

export const adminService = {
      getAllUsers
}