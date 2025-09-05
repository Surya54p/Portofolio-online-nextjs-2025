-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('pending', 'proceed', 'declined', 'complete');

-- CreateEnum
CREATE TYPE "public"."TicketType" AS ENUM ('bug', 'product');

-- CreateTable
CREATE TABLE "public"."Ticket" (
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

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
