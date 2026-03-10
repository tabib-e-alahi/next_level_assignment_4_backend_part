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

const getAllProviders = async () => {
      const result = await prisma.providerProfile.findMany({
            include: {
                  user: {
                        select: {
                              id: true,
                              name: true,
                              email: true,
                              status: true,
                        },
                  },
                  _count: {
                        select: {
                              meals: true,
                        },
                  },
            },
            orderBy: {
                  createdAt: "desc",
            },
      })

      return result;
}

const getProviderByIdPublic = async (providerId: string) => {
      const result = await prisma.providerProfile.findUnique({
            where: {
                  id: providerId,
            },
            include: {
                  user: {
                        select: {
                              id: true,
                              name: true,
                              email: true,
                              status: true,
                              phone: true
                        },
                  },
                  meals: {
                        include: {
                              category: true,
                              _count: {
                                    select: {
                                          reviews: true,
                                    },
                              }
                        },
                        orderBy: {
                              createdAt: "desc",
                        },
                  },
                  _count: {
                        select: {
                              orders: true,
                        },
                  }
            },
      });

      if (!result) {
            throw new Error("Provider not found.");
      }

      return result;
}

//! ------------------- Meals Section ------------------------
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
const deleteMeal = async (mealId: string) => {
      const result = await prisma.meals.delete({
            where: {
                  id: mealId
            }
      })

      return result;
}

export const providerService = {
      createProfile,
      getAllProviders,
      getProviderByIdPublic,
      createMeals,
      updateMeals,
      deleteMeal
}