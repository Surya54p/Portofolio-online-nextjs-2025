/*
  Warnings:

  - The primary key for the `PortfolioCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCategory` on the `PortfolioCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Portofolios" DROP CONSTRAINT "Portofolios_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."PortfolioCategory" DROP CONSTRAINT "PortfolioCategory_pkey",
DROP COLUMN "idCategory",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "PortfolioCategory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."Portofolios" ADD CONSTRAINT "Portofolios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."PortfolioCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
