import { Meals, ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { providerProfileFinder } from "../../utils/providerProfileFinder";

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

      const provider = await providerProfileFinder(userId);

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

const updateMeals = async (data: Partial<Meals>, mealId: string) => {
      const result = await prisma.meals.update({
            where: {
                  id: mealId
            },
            data
      })

      return result;
}

export const providerService = {
      createProfile,
      createMeals,
      updateMeals
}