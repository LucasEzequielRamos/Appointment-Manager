/*
  Warnings:

  - A unique constraint covering the columns `[dayAvailabilityId]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_dayAvailabilityId_key" ON "TimeSlot"("dayAvailabilityId");
