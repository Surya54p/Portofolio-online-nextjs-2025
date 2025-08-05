/*
  Warnings:

  - You are about to drop the `PortfolioCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Portofolios" DROP CONSTRAINT "Portofolios_categoryId_fkey";

-- DropTable
DROP TABLE "public"."PortfolioCategory";

-- CreateTable
CREATE TABLE "public"."PortofolioCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortofolioCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortofolioCategory_name_key" ON "public"."PortofolioCategory"("name");

-- AddForeignKey
ALTER TABLE "public"."Portofolios" ADD CONSTRAINT "Portofolios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."PortofolioCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
