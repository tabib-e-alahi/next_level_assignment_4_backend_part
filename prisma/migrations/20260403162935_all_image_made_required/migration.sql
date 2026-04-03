/*
  Warnings:

  - Made the column `logo` on table `mealCatagories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageURL` on table `meals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `businessLogo` on table `providers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "mealCatagories" ALTER COLUMN "logo" SET NOT NULL;

-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "imageURL" SET NOT NULL;

-- AlterTable
ALTER TABLE "providers" ALTER COLUMN "businessLogo" SET NOT NULL;
