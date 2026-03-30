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

const updateCartItem = async (cartItemId: string, userId: string, newQuantity: number) => {
      const cartItemData = await prisma.cartItem.findUnique({
            where: {
                  id: cartItemId
            },
            select: {
                  cart: {
                        select: {
                              customerId: true
                        }
                  }
            }
      })

      if (cartItemData?.cart.customerId !== userId) {
            throw new Error("Forbidden Access! This is not your cartItem");
      }

      const result = await prisma.cartItem.update({
            where: {
                  id: cartItemId
            },
            data: {
                  quantity: newQuantity
            }
      })

      return result;

}
const removeCartItem = async (cartItemId: string, userId: string) => {
      const cartItemData = await prisma.cartItem.findUnique({
            where: {
                  id: cartItemId
            },
            select: {
                  cart: {
                        select: {
                              customerId: true
                        }
                  }
            }
      })

      if (cartItemData?.cart.customerId !== userId) {
            throw new Error("Forbidden Access! This is not your cartItem");
      }

      const result = await prisma.cartItem.delete({
            where: {
                  id: cartItemId
            }
      })

      return result;

}

const clearCartData = async (userId: string) => {

      const cartData = await prisma.cart.findUnique({
            where: {
                  customerId: userId
            }
      })

      if (!cartData) {
            throw new Error("Cart is empty.");
      }

      const result = await prisma.cart.delete({
            where: {
                  customerId: userId
            }
      })

      return result;

}

export const cartService = {
      addToCart,
      getMyCart,
      updateCartItem,
      removeCartItem,
      clearCartData
}