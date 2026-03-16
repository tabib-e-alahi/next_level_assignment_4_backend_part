// import { prisma } from "../../lib/prisma"

// const getAllMeals = async ({
//       search,
//       categoryId,
//       dietaryTags,
//       minPrice,
//       maxPrice
// }: {
//       search: string | undefined
//       categoryId: string | undefined
//       dietaryTags: string[] | []
//       minPrice: string | undefined
//       maxPrice: string | undefined
// }) => {
//       console.log(search, categoryId, dietaryTags,
//             minPrice,
//             maxPrice);

//       const andConditions: any[] = []

//       if (search) {
//             andConditions.push({
//                   OR: [
//                         {
//                               title: {
//                                     contains: search,
//                                     mode: "insensitive"
//                               }
//                         },
//                         {
//                               description: {
//                                     contains: search,
//                                     mode: "insensitive"
//                               }
//                         },
//                         {
//                               dietary_preferences: {
//                                     has: search
//                               }
//                         }
//                   ]
//             })
//       }

//       if (categoryId) {
//             andConditions.push({
//                   categoryId,
//             });
//       }

//       if (dietaryTags.length > 0) {
//             andConditions.push({
//                   dietary_preferences: {
//                         hasEvery: dietaryTags as string[]
//                   }
//             })
//       }

//       if (minPrice) {
//             andConditions.push({
//                   price: {
//                         gte: minPrice ? Number(minPrice) : undefined,
//                   }
//             })
//       }
//       if (maxPrice) {
//             andConditions.push({
//                   price: {
//                         lte: maxPrice ? Number(maxPrice) : undefined,
//                   }
//             })
//       }

//       const result = await prisma.meals.findMany({
//             where: {
//                   AND: andConditions
//             },
//       });

//       return result;
// }

// export const mealsService = {
//       getAllMeals
// }