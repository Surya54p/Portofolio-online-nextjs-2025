import { PrismaClient } from "@prisma/client";
import admins from "../dataSeed/admin.json";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedAdmin() {
  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        name: admin.name,
        password: hashedPassword,
      },
    });
  }

  console.log("✅ User seed selesai");
}
