-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'unknown@example.com',
ADD COLUMN     "phone_number" TEXT NOT NULL DEFAULT '0000000000',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'unknown';
