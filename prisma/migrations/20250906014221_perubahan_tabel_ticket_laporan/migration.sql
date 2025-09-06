/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Ticket";

-- CreateTable
CREATE TABLE "public"."TicketLaporanMasalah" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noTelp" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."TicketStatus" NOT NULL DEFAULT 'pending',
    "type" "public"."TicketType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketLaporanMasalah_pkey" PRIMARY KEY ("id")
);
