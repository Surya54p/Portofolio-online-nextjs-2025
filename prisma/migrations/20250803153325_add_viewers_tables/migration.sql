-- CreateTable
CREATE TABLE "public"."Viewers" (
    "id" SERIAL NOT NULL,
    "device" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Viewers_pkey" PRIMARY KEY ("id")
);
