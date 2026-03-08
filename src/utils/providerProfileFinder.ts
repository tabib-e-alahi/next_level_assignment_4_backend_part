import { prisma } from "../lib/prisma";

export const providerProfileFinder = async (userId: string) => {
      const provider = await prisma.providerProfile.findUnique({
            where: {
                  userId
            },
            select: {
                  id: true
            }
      })
      
      if (!provider) {
            return false;
      }

      return provider;
}