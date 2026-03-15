import { prisma } from "../../lib/prisma"

const createReview = async ({ userId, orderItemId, mealId, rating, comment }: {
      userId: string
      orderItemId: string
      mealId: string
      rating: number
      comment?: string
}) => {
      const orderData = await prisma.orderItem.findUnique({
            where:{
                  id: orderItemId
            },
            select:{
                  orderId: true
            }
      })

      if(!orderData)
            throw new Error("There is nor order.");

      const isDelivered = await prisma.order.findUnique({
            where: {
                  id: orderData?.orderId,
                  status: "DELIVERED"
            },
      })

      if (!isDelivered) {
            throw new Error("The order is not delivered yet");
      }

      if (isDelivered?.customerId !== userId) {
            throw new Error("Forbidden! You can only reviews in your own ordred meals");
      }

      const review = await prisma.reviews.create({
            data: {
                  customerId: userId,
                  mealId,
                  orderItemId,
                  rating,
                  comment: comment ?? ""
            }
      })

      return review;
}

export const reviewsService = {
      createReview
}