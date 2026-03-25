import { prisma } from "../../lib/prisma";


const getAllCatgeories = async (
      limit: string | undefined
) => {
      const categories = await prisma.category.findMany({
            include: {
                  orderItems: {
                        select: {
                              quantity: true
                        }
                  }
            }
      });
      const sortedCategroties = categories
            .map((cat) => ({
                  ...cat,
                  totalOrder: cat.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                  )
            }))
            .sort((a, b) => b.totalOrder - a.totalOrder);


      if (limit && limit !== "undefined") {
            const result = sortedCategroties.slice(0, Number(limit));
            return result;
      }

      return sortedCategroties;

}

const getAllProviders = async (
      limit: string | undefined
) => {

      const providersData = await prisma.providerProfile.findMany({
            include: {
                  orders: {
                        select: {
                              _count: {
                                    select: {
                                          orderItems: true
                                    }
                              }
                        }
                  }
            }
      });

      // console.log(providersData);

      const sortedProviders = providersData
            .map((provider) => {
                  const totalOrderItems = provider.orders.reduce(
                        (sum, order) => sum + order._count.orderItems,
                        0
                  );

                  return {
                        ...provider,
                        totalOrderItems
                  };
            })
            .sort((a, b) => b.totalOrderItems - a.totalOrderItems);


      if (limit && limit !== "undefined") {
            const result = sortedProviders.slice(0, Number(limit));
            return result;
      }


      return sortedProviders;

}


const getAllMeals = async ({
      search,
      categoryId,
      dietaryTags,
      minPrice,
      maxPrice,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
}: {
      search: string | undefined
      categoryId: string | undefined
      dietaryTags: string[] | []
      minPrice: string | undefined
      maxPrice: string | undefined
      page: number
      limit: number
      skip: number
      sortBy: string
      sortOrder: string
}) => {
      console.log("pARAMS", search, categoryId, dietaryTags,
            minPrice,
            maxPrice);

      const andConditions: any[] = []

      if (search) {
            andConditions.push({
                  OR: [
                        {
                              title: {
                                    contains: search,
                                    mode: "insensitive"
                              }
                        },
                        {
                              description: {
                                    contains: search,
                                    mode: "insensitive"
                              }
                        },
                        {
                              dietary_preferences: {
                                    has: search
                              }
                        }
                  ]
            })
      }

      if (categoryId) {
            andConditions.push({
                  categoryId,
            });
      }

      if (dietaryTags.length > 0) {
            andConditions.push({
                  dietary_preferences: {
                        hasEvery: dietaryTags as string[]
                  }
            })
      }

      if (minPrice) {
            andConditions.push({
                  price: {
                        gte: minPrice ? Number(minPrice) : undefined,
                  }
            })
      }
      if (maxPrice) {
            andConditions.push({
                  price: {
                        lte: maxPrice ? Number(maxPrice) : undefined,
                  }
            })
      }

      const result = await prisma.meals.findMany({
            take: limit,
            skip,
            where: {
                  AND: andConditions
            },
            orderBy: {
                  [sortBy]: sortOrder
            },
            include: {
                  reviews: {
                        select: {
                              rating: true
                        }
                  },
                  category: {
                        select: {
                              name: true
                        }
                  },
                  _count: {
                        select: {
                              reviews: true
                        }
                  }
            }
      });

      return result;
}
const getAllMealById = async (id: string) => {

      const result = await prisma.meals.findUnique({
            where: {
                  id
            },
            include: {
                  provider: true,
                  orderItems: true,
                  reviews: true,
                  category: true,
                  _count: {
                        select: {
                              reviews: true
                        }
                  }
            }
      });

      return result;
}

const getDietaryPreferences = async () => {

      const result = await prisma.meals.findMany({
            select: {
                  dietary_preferences: true
            }
      });

      const uniqueDietaryPreferences = [
            ...new Set(result.map(item => item.dietary_preferences).flat())
      ];

      return uniqueDietaryPreferences;
}

// export const publicService = {
//       getAllCatgeories,
//       getAllProviders,
//       getAllMeals,
//       getAllMealById,
//       getDietaryPreferences
// }