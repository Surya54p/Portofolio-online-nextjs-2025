import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const someTools = await prisma.someTools.findMany({});
  return NextResponse.json(someTools);
}
