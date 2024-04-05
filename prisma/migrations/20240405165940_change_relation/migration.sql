/*
  Warnings:

  - You are about to drop the `_BoughtProductToUserPayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `UserPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoughtProductToUserPayment" DROP CONSTRAINT "_BoughtProductToUserPayment_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoughtProductToUserPayment" DROP CONSTRAINT "_BoughtProductToUserPayment_B_fkey";

-- AlterTable
ALTER TABLE "UserPayment" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BoughtProductToUserPayment";

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
