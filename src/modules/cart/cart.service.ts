import { get } from "node:http";
import { prisma } from "../../lib/prisma";

const addToCart = async (userId: string, mealId: string, quantity: string) => {

      const mealData = await prisma.meals.findUnique({
            where: { id: mealId },
      });

      if (!mealData) {
            throw new Error("Meal not found");
      }

      if (!mealData.isAvailable) {
            throw new Error("Meal Unavailable. Please order another meal.");
      }

      let userCartData = await prisma.cart.findUnique({
            where: { customerId: userId },
      });

      if (!userCartData) {
            userCartData = await prisma.cart.create({
                  data: {
                        customerId: userId,
                  },
            });
      }


      const existignItem = await prisma.cartItem.findUnique({
            where: {
                  cartId_mealId: {
                        cartId: userCartData.id,
                        mealId,
                  },
            },
      });

      // jodi agei thekei item ta thake tahole just quantity ta update
      if (existignItem) {
            const result = await prisma.cartItem.update({
                  where: {
                        id: existignItem.id
                  },
                  data: {
                        quantity: existignItem.quantity + Number(quantity),
                  },
            });

            return result;
      }

      // ar na thakle new kore add kore dite hobe mealId, customerId and quantity
      const result = await prisma.cartItem.create({
            data: {
                  cartId: userCartData.id,
                  mealId,
                  quantity: Number(quantity),
            },
      });

      return result;
};

const getMyCart = async (userId: string) => {
      const result = await prisma.cart.findUnique({
            where: {
                  customerId: userId
            },
            include: {
                  items: {
                        include: {
                              meal: {
                                    select: {
                                          id: true,
                                          title: true,
                                          price: true,
                                          category: {
                                                select: {
                                                      name: true
                                                }
                                          },
                                          provider: {
                                                select: {
                                                      id: true,
                                                      businessName: true
                                                }
                                          }
                                    },
                              },
                        },
                  },
            },
      })

      return result
}

export const cartService = {
      addToCart,
      getMyCart
}