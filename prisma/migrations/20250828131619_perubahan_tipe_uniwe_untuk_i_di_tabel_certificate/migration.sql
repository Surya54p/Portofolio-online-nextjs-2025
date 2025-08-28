/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Certificates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Certificates_id_key" ON "public"."Certificates"("id");
