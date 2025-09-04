-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('SoftSkill', 'HardSkill');

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT,
    "category" "public"."Category" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
