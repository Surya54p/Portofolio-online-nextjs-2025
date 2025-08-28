-- CreateTable
CREATE TABLE "public"."Certificates" (
    "id" TEXT NOT NULL,
    "src" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificates_pkey" PRIMARY KEY ("id")
);
