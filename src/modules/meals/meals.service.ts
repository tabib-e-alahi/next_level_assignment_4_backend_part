import { prisma } from "../../lib/prisma"

const getAllMeals = async ({
      search,
      cuisine,
      dietaryTags,
      minPrice,
      maxPrice
}: {
      search: string | undefined
      cuisine: string | undefined
      dietaryTags: string[] | []
      minPrice: string | undefined
      maxPrice: string | undefined
}) => {
      console.log(search, cuisine, dietaryTags,
            minPrice,
            maxPrice);
      const result = await prisma.meals.findMany();

      return result;
}

export const mealsService = {
      getAllMeals
}