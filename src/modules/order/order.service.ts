import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, deliveryAddress: string) => {
      const cartData = await prisma.cart.findUnique({
            where: { customerId: userId },
            include: {
                  items: {
                        include: {
                              meal: {
                                    select: {
                                          id: true,
                                          price: true,
                                          providerId: true,
                                    }
                              },
                        },
                  },
            },
      });
      console.log(cartData);

      if (!cartData || cartData.items.length === 0) {
            throw new Error("Cart is empty.");
      }

      const cartItems = cartData.items;

      const totalAmount = cartItems.reduce((total, item) => {
            return total + item.quantity * item.meal.price;
      }, 0);

      

      const result = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                  data: {
                        customerId: userId,
                        deliveryAddress,
                        totalAmount,
                        providerId: cartItems[0]!.meal.providerId,
                  },
            });

            for (const item of cartItems) {
                  await tx.orderItem.create({
                        data: {
                              orderId: newOrder.id,
                              mealId: item.mealId,
                              quantity: item.quantity,
                              unitPrice: item.meal.price,
                        },
                  });
            }
            // now cart theke item gulo delete 
            await tx.cartItem.deleteMany({
                  where: {
                        cartId: cartData.id,
                  },
            });

            return newOrder;
      });

      return result;
}


const getMyOrders = async(userId: string) =>{
      const result = await prisma.order.findMany({
      where: {
        customerId: userId,
      },
      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
}
const getMyOrderById = async(userId: string, orderId: string) =>{
      const result = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId: userId,
      },
      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
    });

    if(!result){
      throw new Error("Order not found")
    }

    return result;
}

export const orderService = {
      createOrder,
      getMyOrders,
      getMyOrderById
}

// [
//   {
//     id: '4ff254c6-270a-4ea9-8b45-a0b60e2f5f23',
//     cartId: 'e769fa2f-859a-4588-aa09-b56dd0e92341',
//     mealId: '72de565c-958e-499f-b58d-5d4c65f260a1',
//     quantity: 6,
//     meal: {
//       id: '72de565c-958e-499f-b58d-5d4c65f260a1',
//       title: 'Vegan Buddha Bowl',
//       description: 'Healthy bowl with quinoa, avocado, roasted vegetables and tahini dressing.',
//       price: 220,
//       imageURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
//       isAvailable: true,
//       dietary_preferences: [Array],
//       createdAt: 2026-03-09T09:45:57.535Z,
//       updatedAt: 2026-03-09T09:45:57.535Z,
//       providerId: '2d0891f9-0b4e-4061-992c-faff7a50aa77',
//       categoryId: '11f74e70-5d6c-48f5-871d-bb160fe29e24'
//     }
//   }
// ]