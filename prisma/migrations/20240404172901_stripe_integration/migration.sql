-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "BoughtProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoughtProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'STRIPE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoughtProductToUserPayment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_transactionId_key" ON "UserPayment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "_BoughtProductToUserPayment_AB_unique" ON "_BoughtProductToUserPayment"("A", "B");

-- CreateIndex
CREATE INDEX "_BoughtProductToUserPayment_B_index" ON "_BoughtProductToUserPayment"("B");

-- AddForeignKey
ALTER TABLE "BoughtProduct" ADD CONSTRAINT "BoughtProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoughtProduct" ADD CONSTRAINT "BoughtProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoughtProductToUserPayment" ADD CONSTRAINT "_BoughtProductToUserPayment_A_fkey" FOREIGN KEY ("A") REFERENCES "BoughtProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoughtProductToUserPayment" ADD CONSTRAINT "_BoughtProductToUserPayment_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
