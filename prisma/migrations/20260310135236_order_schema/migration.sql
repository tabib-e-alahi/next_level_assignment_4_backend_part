/*
  Warnings:

  - You are about to drop the column `mealId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_mealId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "mealId";
