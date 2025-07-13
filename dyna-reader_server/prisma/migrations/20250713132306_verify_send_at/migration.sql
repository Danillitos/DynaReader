-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userID_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifySendAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
