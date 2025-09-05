import { PrismaClient, Category } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

export async function seedSkill() {
  const filePath = path.resolve(__dirname, "../dataSeed/skillList.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠️ skillList.json not found. Skipping skill seed.");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const skills = JSON.parse(fileContent);

  for (const skill of skills) {
    // Map category string → enum
    let category: Category;
    if (skill.category === "Soft Skill") category = "SoftSkill";
    else if (skill.category === "Hard Skill") category = "HardSkill";
    else {
      console.warn(`⚠️ Unknown category for skill: ${skill.title}`);
      continue;
    }
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {},
      create: {
        id: skill.id,
        name: skill.title,
        description: skill.description,
        category,
        img: skill.img,
      },
    });
  }

  console.log("✅ skill seed selesai");
}
