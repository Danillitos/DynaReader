/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `averageReading` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dailyGoal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificationType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `readerType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `streak` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userID` on the `Progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bookID` on the `Progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_bookID_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userID_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_pkey",
DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL,
DROP COLUMN "bookID",
ADD COLUMN     "bookID" INTEGER NOT NULL,
ADD CONSTRAINT "Progress_pkey" PRIMARY KEY ("userID", "bookID");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "averageReading",
DROP COLUMN "dailyGoal",
DROP COLUMN "notificationType",
DROP COLUMN "readerType",
DROP COLUMN "streak",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ReaderData" (
    "id" SERIAL NOT NULL,
    "dailyGoal" INTEGER,
    "streak" INTEGER,
    "notificationType" TEXT,
    "readerType" TEXT,
    "averageReading" INTEGER,

    CONSTRAINT "ReaderData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReaderData" ADD CONSTRAINT "ReaderData_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
