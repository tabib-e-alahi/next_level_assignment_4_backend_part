import { Meals, OrderSatus, ProviderProfile } from "../../generated/prisma/client";
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

const getProviderProfile = async (providerId: string) => {
      const result = await prisma.providerProfile.findUnique({
            where:{
                  id:providerId 
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
                              meals: true,
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

      console.log(result);

      return result;
}

const getProviderAllMeals = async (providerId: string) => {
      const result = await prisma.meals.findMany({
            where: {
                  providerId
            },
            include: {
                  category: true,
                  reviews: {
                        include: {
                              customer: {
                                    select: {
                                          name: true
                                    }
                              }
                        }
                  },
                  _count: {
                        select: {
                              orderItems: true,
                              reviews: true
                        }
                  }
            }
      })
      return result;
}
const getProviderSingleMeal = async (providerId: string, mealId: string) => {
      const result = await prisma.meals.findUnique({
            where: {
                  id: mealId,
                  providerId
            },
            include: {
                  category: true,
                  reviews: {
                        include: {
                              customer: {
                                    select: {
                                          name: true
                                    }
                              }
                        }
                  },
                  _count: {
                        select: {
                              orderItems: true,
                              reviews: true
                        }
                  }
            }
      })
      return result;
}

const updateMeals = async (data: Partial<Meals>, mealId: string) => {
      console.log(data);
      const result = await prisma.meals.update({
            where: {
                  id: mealId
            },
            data
      })

      return result;
}
const deleteMeal = async (mealId: string) => {
      console.log(mealId);
      const hasOrder = await prisma.orderItem.findFirst({
            where: {
                  mealId
            }
      })

      if (hasOrder) {
            const result = await prisma.meals.update({
                  where: {
                        id: mealId
                  },
                  data: {
                        isAvailable: false
                  }
            })

            return result
      }
      const result = await prisma.meals.delete({
            where: {
                  id: mealId
            }
      })


      return result;
}

const viewIncomingOrders = async (providerId: string) => {
      const orderIds_with_placed = await prisma.order.findMany({
            where: {
                  providerId,
                  status: "PLACED"
            },
            select: {
                  id: true
            }
      })

      console.log(orderIds_with_placed); //[ { id: '3397b7fc-994c-4bdb-bb8d-91c4e6a3dc7b' } ]
      const orderIds = orderIds_with_placed.map(order => order.id);

      const result = await prisma.orderItem.findMany({
            where: {
                  orderId: {
                        in: orderIds
                  }
            },
            include: {
                  meal: {
                        select: {
                              title: true
                        }
                  },
                  order: {
                        select: {
                              customer: {
                                    select: {
                                          name: true,
                                          phone: true
                                    }
                              }
                        }
                  }
            }
      })

      return {
            totalOrder: result.length,
            result
      };
}
const getAllOrders = async (providerId: string) => {
      const allorderIds = await prisma.order.findMany({
            where: {
                  providerId,
            },
            select: {
                  id: true
            }
      })

      console.log(allorderIds); //[ { id: '3397b7fc-994c-4bdb-bb8d-91c4e6a3dc7b' } ]
      const orderIds = allorderIds.map(order => order.id);

      const result = await prisma.order.findMany({
            where: {
                  id: {
                        in: orderIds
                  }
            },
            include: {
                  customer:{
                        select:{
                              name: true,
                              phone: true
                        }
                  },
                  orderItems:{
                        select:{
                             quantity: true,
                             unitPrice:true,
                             meal:{
                              select:{
                                    title:true,
                                    price:true,
                              }
                             } 
                        }
                  },
                  _count:{
                        select:{
                              orderItems: true
                        }
                  }
            }
      })

      return {
            totalOrder: result.length,
            result
      };
}

const updateOrderStatus = async (orderId: string, status: OrderSatus, providerId: string) => {
      const orderData = await prisma.order.findUnique({
            where: {
                  id: orderId,
                  providerId
            },
      });

      if (!orderData) {
            throw new Error("Order not found or this is not your order data");
      }

      const result = await prisma.order.update({
            where: { id: orderId, providerId },
            data: {
                  status,
            },
      });

      return result;
}

export const providerService = {
      createProfile,
      getAllProviders,
      getProviderProfile,
      getProviderByIdPublic,
      createMeals,
      getProviderAllMeals,
      getProviderSingleMeal,
      updateMeals,
      deleteMeal,
      viewIncomingOrders,
      updateOrderStatus,
      getAllOrders
}