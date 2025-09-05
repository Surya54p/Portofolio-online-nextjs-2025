/*
  Warnings:

  - You are about to drop the column `src` on the `Certificates` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Portofolios` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Certificates" DROP COLUMN "src",
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "public"."Portofolios" DROP COLUMN "src",
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "src",
ADD COLUMN     "img" TEXT;

-- CreateTable
CREATE TABLE "public"."SomeTools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "techStack" TEXT[],
    "img" TEXT,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "SomeTools_pkey" PRIMARY KEY ("id")
);
