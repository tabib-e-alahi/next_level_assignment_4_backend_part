import { ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProfile = async (data: ProviderProfile, userId: string) => {
      const existingProfile = await prisma.providerProfile.findUnique({
            where: { userId },
      });

      if (existingProfile) {
            throw new Error("Provider profile already exists");
      }

      const result = await prisma.providerProfile.create({
            data: {
                  ...data,
                  userId
            }
      })

      return result;

}


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

export const providerService = {
      createProfile,
      createMeals
}