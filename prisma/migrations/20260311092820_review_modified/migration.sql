/*
  Warnings:

  - You are about to drop the column `orderId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `orderItemId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_orderId_fkey";

-- DropIndex
DROP INDEX "reviews_mealId_idx";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "orderId",
ADD COLUMN     "orderItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
