/*
  Warnings:

  - Added the required column `productId` to the `UserPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPayment" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
