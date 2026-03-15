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


      if (limit) {
            const result = sortedCategroties.slice(0, Number(limit));
            return result;
      } else {
            const result = sortedCategroties.slice(0, );
            return result;
      }

}

export const publicService = {
      getAllCatgeories
}