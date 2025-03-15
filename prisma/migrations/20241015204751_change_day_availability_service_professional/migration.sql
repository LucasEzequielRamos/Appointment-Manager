/*
  Warnings:

  - You are about to drop the column `professional_id` on the `DayAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `dayAvailabilityId` on the `TimeSlot` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `DayAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "DayAvailability" DROP CONSTRAINT "DayAvailability_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_dayAvailabilityId_fkey";

-- DropIndex
DROP INDEX "TimeSlot_dayAvailabilityId_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancelled_reason" TEXT,
ADD COLUMN     "delivered_at" TIMESTAMP(0),
ALTER COLUMN "client_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DayAvailability" DROP COLUMN "professional_id",
ADD COLUMN     "service_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "professional_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "dayAvailabilityId";

-- AddForeignKey
ALTER TABLE "DayAvailability" ADD CONSTRAINT "DayAvailability_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_id_fkey" FOREIGN KEY ("id") REFERENCES "DayAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "ProfessionalProfile"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "ClientProfile"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "ProfessionalProfile"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;
