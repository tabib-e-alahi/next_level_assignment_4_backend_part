import { prisma } from "../../lib/prisma"

const createMeals = async (data: any, userId: string) => {
      const provider = await prisma.providerProfile.findUnique({
            where: {
                  userId
            },
            select: {
                  id: true
            }
      })
      if (!provider) {
            throw new Error("Provider profile not found. First create a provider profile.");
      }

      const result = await prisma.meals.create({
            data: {
                  ...data,
                  providerId: provider.id
            }
      })

      return result;
}

export const mealsService = {
      createMeals
}