/*
  Warnings:

  - The primary key for the `Portofolios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Portofolios" DROP CONSTRAINT "Portofolios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Portofolios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Portofolios_id_seq";
