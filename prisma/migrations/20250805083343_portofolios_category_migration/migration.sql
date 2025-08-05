/*
  Warnings:

  - You are about to drop the column `category` on the `Portofolios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Portofolios" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER;

-- CreateTable
CREATE TABLE "public"."PortfolioCategory" (
    "idCategory" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioCategory_pkey" PRIMARY KEY ("idCategory")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioCategory_name_key" ON "public"."PortfolioCategory"("name");

-- AddForeignKey
ALTER TABLE "public"."Portofolios" ADD CONSTRAINT "Portofolios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."PortfolioCategory"("idCategory") ON DELETE SET NULL ON UPDATE CASCADE;
