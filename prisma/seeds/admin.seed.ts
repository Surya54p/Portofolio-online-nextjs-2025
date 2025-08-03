// import { PrismaClient } from "@prisma/client";
// import admins from "../dataSeed/admin.json";
// import bcrypt from "bcrypt";
// const prisma = new PrismaClient();

// export async function seedAdmin() {
//   for (const admin of admins) {
//     const hashedPassword = await bcrypt.hash(admin.password, 10);

//     await prisma.admin.upsert({
//       where: { email: admin.email },
//       update: {},
//       create: {
//         email: admin.email,
//         name: admin.name,
//         password: hashedPassword,
//       },
//     });
//   }

//   console.log("✅ User seed selesai");
// }
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function seedAdmin() {
  const filePath = path.resolve(__dirname, "../../dataSeed/admin.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ admin.json not found. Skipping admin seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const admins = JSON.parse(fileContent);

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

  console.log("✅ Admin seed selesai");
}
