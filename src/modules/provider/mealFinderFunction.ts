import { prisma } from "../../lib/prisma";

export const mealFinderFunction = async (mealId: string) => {
      const existingMeal = await prisma.meals.findUnique({
            where: {
                  id: mealId,
            },
            select: {
                  providerId: true
            }
      });

      return existingMeal;
}