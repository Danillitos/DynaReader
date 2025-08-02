/*
  Warnings:

  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resetCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_resetToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetCodeExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_resetCode_key" ON "User"("resetCode");
