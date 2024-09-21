/*
  Warnings:

  - Made the column `address` on table `ClientProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `ClientProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverage` on table `ClientProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClientProfile" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "coverage" SET NOT NULL;
