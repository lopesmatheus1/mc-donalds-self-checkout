/*
  Warnings:

  - The values [DELIVERY,PICKUP] on the enum `ConsuptionMethod` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsuptionMethod_new" AS ENUM ('DINE_IN', 'TAKE_AWAY');
ALTER TABLE "Order" ALTER COLUMN "consuptionMethod" TYPE "ConsuptionMethod_new" USING ("consuptionMethod"::text::"ConsuptionMethod_new");
ALTER TYPE "ConsuptionMethod" RENAME TO "ConsuptionMethod_old";
ALTER TYPE "ConsuptionMethod_new" RENAME TO "ConsuptionMethod";
DROP TYPE "ConsuptionMethod_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
