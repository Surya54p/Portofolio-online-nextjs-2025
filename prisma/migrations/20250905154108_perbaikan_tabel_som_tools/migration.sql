/*
  Warnings:

  - Made the column `img` on table `SomeTools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `SomeTools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `SomeTools` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."SomeTools" ALTER COLUMN "img" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;
