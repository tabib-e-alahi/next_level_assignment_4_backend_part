/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `mealCatagories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mealCatagories" ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "mealCatagories_slug_key" ON "mealCatagories"("slug");
